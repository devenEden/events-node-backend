const models = require("../../../database/models");

class StaffService {
  static async findOneStaff(userId) {
    return await models.Staff.findOne({
      where: { user_id: userId },
      include: { association: models.Staff.user },
    });
  }

  static async addStaff(body) {
    return await models.Staff.create(body);
  }

  static async destroyStaff(ID) {
    return await models.Staff.destroy({ where: { id: ID } });
  }

  static async updateStaff(body, ID) {
    return await models.Staff.update(body, { where: { id: ID } });
  }
}

module.exports = StaffService;
