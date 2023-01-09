const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const dbEnvConfigs = require("../config/config");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = dbEnvConfigs[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const directories = fs.readdirSync(__dirname).filter((file) => {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

let modelFiles = [];

directories.forEach((value) => {
  const currentModelFiles = fs
    .readdirSync(path.join(__dirname, value))
    .filter(function (file) {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-9) === ".model.js"
      );
    })
    .map((file) => {
      return path.join(__dirname, value, file);
    });

  modelFiles = modelFiles.concat(currentModelFiles);
});

modelFiles.forEach((modelFile) => {
  // eslint-disable-next-line global-require
  const model = require(modelFile)(sequelize, Sequelize.DataTypes);

  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
