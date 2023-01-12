const models = require("../../../database/models");

class StaffService {
  static async findOneStaff(options) {
    return await models.Staff.findOne(options);
  }

  static async createStaff(body) {
    return await models.Staff.create(body);
  }

  static async destroyStaff(ID) {
    return await models.Staff.destroy({ where: { id: ID } });
  }

  static async updateStaff(body, options) {
    return await models.Staff.update(body, options);
  }
}

module.exports = StaffService;
