const models = require("../../../database/models");

class EventActivitiesService {
  static async findEventActivities(ID) {
    return await models.EventActivities.findAll({ where: { event_id: ID } });
  }

  static async findOneEventActivity(ID) {
    return await models.EventActivities.findOne({
      where: { event_id: ID },
      include: { association: models.EventActivities.event },
    });
  }

  static async addEventActivity(body) {
    return await models.EventActivities.create(body);
  }

  static async destroyEventActivity(ID) {
    return await models.EventActivities.destroy({ where: { id: ID } });
  }

  static async updateEventActivity(body, ID) {
    return await models.EventActivities.update(body, { where: { id: ID } });
  }
}

module.exports = EventActivitiesService;
