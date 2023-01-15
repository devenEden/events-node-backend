const {
  httpResponse,
  emailValidator,
  createToken,
  otpGenerator,
  verificationTokenGenerator,
} = require("../../helpers");
const { UserService } = require("../../services");
const bcrypt = require("bcrypt");
const {
  emailRegistrationTemplate,
  EmailUtil,
  emailForgotPasswordTemplate,
} = require("../../utils");
const fs = require("fs");
const path = require("path");
const appConfig = require("../../../config/appConfig");

const http = new httpResponse();
const emailUtil = new EmailUtil();

class UserController {
  async login(req, res) {
    try {
      const data = req.body;

      const verifyEmail = emailValidator(data.email);

      if (!verifyEmail) throw new Error("Please enter a valid email");

      const user = await UserService.findOneUser({
        where: { email: data.email },
        attributes: {
          include: ["password"],
        },
      });

      if (!user) throw new Error("Invalid credentials");

      if (!data.password) throw new Error("Invalid credentials");

      const checkPassword = await bcrypt.compare(data.password, user.password);

      if (!user.email_verified)
        throw new Error(
          "Your account has not yet been confirmed. Please check your email to confirm your account"
        );

      if (!checkPassword) throw new Error("Wrong credentials");

      const token = createToken({
        id: user.id,
        username: data.username,
      });

      const tokenResponse = {
        token_type: "Bearer",
        token,
      };

      http.setSuccess(200, "Login successful", {
        access_token: tokenResponse,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to login your account", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async registerUser(req, res) {
    try {
      const data = req.body;

      data.username = data.email;

      const verifyEmail = emailValidator(data.email);

      if (!verifyEmail) throw new Error("Please enter a valid email");

      const userEmailOrUsernameExists =
        await UserService.invalidUserEmailOrPhone(data);

      if (userEmailOrUsernameExists)
        throw new Error("The email you entered already exists");

      const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS, 10);
      const salt = await bcrypt.genSalt(saltRounds);
      const { password } = data;

      data.password = await bcrypt.hash(data.password, salt);

      // one time password
      const otp = otpGenerator(8);
      const token = verificationTokenGenerator();
      const userTokenData = {
        email: data.email,
        otp_code: await bcrypt.hash(otp, salt),
        token,
        // set token to expires two days from now
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
        created_at: new Date(),
      };

      const user = await UserService.createUser(data);

      await UserService.createUserToken(userTokenData);

      const emailMessage = emailRegistrationTemplate(
        appConfig.APP_NAME,
        `${appConfig.APP_CLIENT}/confirm-account/${token}`,
        `${data.surname} ${data.other_names}`,
        otp,
        password,
        data.username
      );

      emailUtil.sendMessage(
        data.email,
        "EVENTS APP ACCOUNT CONFIRMATION",
        emailMessage
      );

      http.setSuccess(201, "Successfully registered your account", { user });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to create your account", {
        message: error.message,
      });
      http.send(res);
    }
  }

  verifyUserToken(req, res) {
    try {
      const { user } = req;

      http.setSuccess(200, "Successfully loaded loader auth user profile", {
        user,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to verify your account", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async verifyUserAccount(req, res) {
    try {
      const { token } = req.params;
      const data = req.body;

      const userToken = await UserService.findToken({ where: { token } });

      if (!userToken) throw new Error("Invalid Token");

      if (!data.otp) throw new Error("Please provide your one time password");
      const checkOtp = await bcrypt.compare(data.otp, userToken?.otp_code);

      if (!checkOtp) throw new Error("Invalid token provided");

      const user = await UserService.updateUser(
        {
          email_verified: true,
        },
        { where: { email: userToken.email } }
      );

      if (!user) throw new Error("Sorry there was an internal server error");

      await UserService.destroyUserToken(token);

      http.setSuccess(200, "Successfully verified your account", { user });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to verify your account", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async forgotPassword(req, res) {
    try {
      const data = req.body;

      const verifyEmail = emailValidator(data.email);

      if (!verifyEmail) throw new Error("Please enter a valid email");

      const user = await UserService.findOneUser({
        where: { email: data.email },
      });

      if (!user.success) throw new Error(user.error);

      const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS, 10);
      const salt = await bcrypt.genSalt(saltRounds);
      const otp = otpGenerator(8);
      const token = verificationTokenGenerator();
      const userTokenData = {
        email: data.email,
        otp_code: await bcrypt.hash(otp, salt),
        token,
        // set token to expires two days from now
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        created_at: new Date(),
      };

      const userToken = await UserService.createUserToken(userTokenData);

      if (!userToken.success) throw new Error(userToken.error);

      const emailMessage = emailForgotPasswordTemplate(
        appConfig.APP_NAME,
        `${appConfig.CLIENT_URL}/reset-password/${token}`,
        `${user.surname} ${user.other_names}`,
        otp
      );

      emailUtil.sendMessage(
        data.email,
        "EVENTS APP ACCOUNT PASSWORD RESET",
        emailMessage
      );

      http.setSuccess(
        200,
        `An email has been sent to ${data.email} to reset password`,
        {}
      );

      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to send token your account token", {
        message: error.message,
      });
      http.send(res);
    }
  }

  /**
   * reset password controller
   * @param {*} req
   * @param {*} res
   */
  async resetPassword(req, res) {
    try {
      const data = req.body;
      const { token } = req.params;
      const userToken = await UserService.findToken({ where: { token } });

      const now = new Date();
      const resetPasswordExpires = new Date(userToken.expires);

      if (now >= resetPasswordExpires)
        throw new Error("Your reset password token has expired");

      if (!userToken.success) throw new Error(userToken.error);

      const checkOtp = await bcrypt.compare(data.otp, userToken.otp_code);

      if (!checkOtp) throw new Error("Invalid One time password provided");

      const saltRounds = parseInt(process.env.HASH_SALT_ROUNDS, 10);
      const salt = await bcrypt.genSalt(saltRounds);

      data.password = await bcrypt.hash(data.password, salt);

      const user = await UserService.updateUser(
        { password: data.password },
        { where: { email: userToken.email } }
      );

      await UserService.destroyUserToken(token);

      http.setSuccess(200, "Successfully reset your password", { user });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to reset your account password", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async changePassword(req, res) {
    try {
      const { user, body } = req;

      if (body.old_password == body.password)
        throw new Error("The old password can not be the new Password");
      else if (body.password.length < 8)
        throw new Error("Password should be greater than 8 characters");

      const userDetails = await UserService.findOneUser({
        where: { id: user.id },
        attributes: ["password"],
      });

      const checkPassword = await bcrypt.compare(
        body.old_password,
        userDetails.password
      );

      if (!checkPassword) throw new Error("Invalid old password");

      const salt = await bcrypt.genSalt(10);

      const password = await bcrypt.hash(body.password, salt);

      await UserService.updateUser({ password }, { where: { id: user.id } });

      http.setSuccess(200, "Successfully updated your password ", {});
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to change your password", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async uploadUserAvatar(req, res) {
    try {
      const { user, file } = req;

      if (!file) throw new Error("Please upload an image");

      const avatar = path.join("./avatars", file.filename);

      if (user.avatar) {
        fs.unlink(path.join("./assets", user.avatar), (err) => {
          if (err)
            throw new Error(
              "Sorry an internal server error occured while uploading your avatar"
            );
        });
      }
      const userAvatar = await UserService.updateUser(
        { avatar },
        { where: { id: user.id } }
      );

      http.setSuccess(200, "Successfully updated user avatar", {
        userAvatar,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to update user avatar", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = UserController;
