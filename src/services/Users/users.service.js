const { Op } = require("sequelize");
const models = require("../../../database/models");

class UserService {
  static async findOneUser(options) {
    return await models.User.findOne(options);
  }

  static async findToken(options) {
    return await models.UserToken.findOne(options);
  }

  static async createUser(body) {
    return await models.User.create(body);
  }

  static async invalidUserEmailOrPhone(body) {
    return await models.User.findOne({
      where: { [Op.or]: [{ email: body.email }, { username: body.username }] },
    });
  }

  static async createUserToken(body) {
    return await models.UserToken.create(body);
  }

  static async destroyUserToken(token) {
    return await models.UserToken.destroy({ where: { token } });
  }

  static async updateUser(body, options) {
    return await models.User.update(body, options);
  }
}

module.exports = UserService;
