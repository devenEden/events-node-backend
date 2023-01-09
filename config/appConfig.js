require("dotenv").config();

module.exports = Object.freeze({
  SECRET: process.env.SECRET,
  EXPIRES_IN: process.env.SECRET_EXPIRES_IN,
  APP_NAME: process.env.APP_NAME,
  WEBHOOK_HASH: process.env.WEB_HOOK_HASH,
  LOGOS: "./assets/logos",
});
