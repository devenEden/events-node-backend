const Qrcode = require("qrcode");
const winston = require("winston");
const fs = require("fs");
const appConfig = require("../../config/appConfig");

const generateQrCode = (string) => {
  if (!fs.existsSync(appConfig.QR_CODE))
    fs.mkdirSync(appConfig.QR_CODE, { recursive: true });

  Qrcode.toFile(`${appConfig.QR_CODE}-qrcode.png`, string, (err) => {
    if (err) winston.error(err);
  });

  return `${appConfig.QR_CODE}-qrcode.png`;
};

module.exports = generateQrCode;
