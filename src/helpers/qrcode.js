const Qrcode = require("qrcode");
const fs = require("fs");
const appConfig = require("../../config/appConfig");

const generateQrCode = async (string) => {
  if (!fs.existsSync(appConfig.QR_CODE))
    fs.mkdirSync(appConfig.QR_CODE, { recursive: true });

  return await Qrcode.toDataURL(string, {});
};

module.exports = generateQrCode;
