const fs = require("fs");
const multer = require("multer");
const appConfig = require("../../config/appConfig");

if (!fs.existsSync(appConfig.EVENT_IMAGES))
  fs.mkdirSync(appConfig.EVENT_IMAGES, { recursive: true });
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
    cb(null, appConfig.EVENT_IMAGES);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const eventImageUploader = multer({
  storage: avatarStorage,
  limits: avatarMaxStorage,
  fileFilter: imageFilter,
});

module.exports = { eventImageUploader };
