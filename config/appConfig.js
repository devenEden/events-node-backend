require("dotenv").config();

module.exports = Object.freeze({
  SECRET: process.env.SECRET,
  EXPIRES_IN: process.env.SECRET_EXPIRES_IN,
  APP_NAME: process.env.APP_NAME,
  WEBHOOK_HASH: process.env.WEB_HOOK_HASH,
  APP_CLIENT: process.env.APP_CLIENT,
  LOGOS: "./assets/logos",
  USER_AVATARS: "./assets/avatars",
  EVENT_IMAGES: "./assets/events",
  QR_CODE: "./assets/qrcodes/",
  ATTACHMENT: "./assets/attachments/",
});
