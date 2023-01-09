const { decodeToken } = require("../helpers");
const { httpResponse } = require("../helpers/");
const { isEmpty } = require("lodash");
const UserService = require("../services/Users/users.service");

const http = new httpResponse();

/**
 * ENSURE the user token is provided and valid;
 *
 * @param {*} req Request Header that contains the token.
 * @param {*} res Handle http Response.
 * @param {*} next continue to the next middleware if token is valid.
 *
 * @return {*} Return Json of function next response.
 */
const loginRequired = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization) {
    try {
      const authToken = authorization.split(" ");

      if (authToken[0] !== "Bearer") {
        http.setError(403, "Invalid access token type provided.");

        return http.send(res);
      }

      // DECODE the token to check it returns user Object or an Error message
      const decodedToken = decodeToken(authToken[1]);

      if (isEmpty(decodedToken) || !decodedToken.id) {
        http.setError(401, "Invalid token provided", {
          error: { message: decodedToken },
        });

        return http.send(res);
      }

      // IDENTIFY the token user and set the request user to the new user Object
      const tokenUser = await UserService.findOneUser({
        where: {
          id: decodedToken.id,
        },
      });

      if (!tokenUser || isEmpty(tokenUser.dataValues)) {
        http.setError(401, "Invalid token provided.", {
          error: { message: "Token user does not exist" },
        });

        return http.send(res);
      }

      if (!tokenUser.email_verified) {
        http.setError(401, "Unable to verify your account", {
          error: {
            message: "Please check your email to and verify your account",
          },
        });

        return http.send(res);
      }

      req.user = tokenUser.dataValues;

      return next();
    } catch (error) {
      http.setError(401, "Unable to process your request", {
        error: error.message,
      });

      http.send(res);
    }
  }

  http.setError(401, "Unauthorized access");

  return http.send(res);
};

module.exports = loginRequired;
