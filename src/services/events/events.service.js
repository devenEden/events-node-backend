const models = require("../../../database/models");

class EventsService {
  async findEvents() {
    return await models.Events.findAll();
  }
  async findMyEvents(userId) {
    return await models.Events.findAll({ where: { user_id: userId } });
  }
  async findEventDetails(eventId) {
    return await models.Events.findAll({
      where: {
        id: eventId,
      },
      include: [
        {
          association: models.Events.eventImages,
        },
        {
          association: models.Events.user,
          attributes: ["id", "surname", "other_names", "email", "contact"],
        },
      ],
    });
  }

  async createEvent(body) {
    return await models.Events.create(body);
  }

  async updateEventById(body, id) {
    return await models.Events.update(body, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async createEventImage(body) {
    return await models.EventImages.create(body);
  }

  async findEventImage(id) {
    return await models.EventImages.findOne({ where: { id } });
  }

  async deleteEventImage(id) {
    return await models.EventImages.destroy({ where: { id } });
  }

  async deleteEvent(id) {
    await models.EventImages.destroy({ where: { event_id: id } });

    return await models.Events.destroy({ where: { id } });
  }
}

module.exports = EventsService;
