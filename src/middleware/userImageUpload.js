const fs = require("fs");
const multer = require("multer");
const appConfig = require("../../config/appConfig");

if (!fs.existsSync(appConfig.USER_AVATARS))
  fs.mkdirSync(appConfig.USER_AVATARS, { recursive: true });
const avatarMaxStorage = 2000000;

const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Only image (JPG, JPEG, PNG) files are allowed!";

    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appConfig.USER_AVATARS);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const avatarUploader = multer({
  storage: avatarStorage,
  limits: avatarMaxStorage,
  fileFilter: imageFilter,
});

module.exports = { avatarUploader };
