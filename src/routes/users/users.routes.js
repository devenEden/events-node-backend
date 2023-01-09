const express = require("express");
const UsersController = require("../../controllers/users/users.controller");
const loginRequired = require("../../middleware/authRoute");
const { avatarUploader } = require("../../middleware/userImageUpload");

const usersRouter = express.Router();

const controller = new UsersController();

usersRouter.get(
  "/auth/verify-token",
  loginRequired,
  controller.verifyUserToken
);
usersRouter.put(
  "/avatar",
  loginRequired,
  avatarUploader.single("avatar"),
  controller.uploadUserAvatar
);
usersRouter.post("/auth/register", controller.registerUser);
usersRouter.post("/auth/verify-account/:token", controller.verifyUserAccount);
usersRouter.post("/auth/forgot-password", controller.forgotPassword);
usersRouter.post("/auth/login", controller.login);

usersRouter.patch("/auth/reset-password/:token", controller.resetPassword);
usersRouter.patch(
  "/auth/change-password",
  loginRequired,
  controller.changePassword
);

module.exports = usersRouter;
