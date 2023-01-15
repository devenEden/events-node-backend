const models = require("../../../database/models");

class ScanService {
  async findScan(id) {
    return await models.Scan.findOne({ where: { id } });
  }

  async createScan(data) {
    return await models.Scan.create(data);
  }

  async findTicket(ticketId) {
    return await models.Ticket.findOne({ where: { id: ticketId } });
  }

  async findActivity(activityId) {
    return await models.EventActivities.findOne({ where: { id: activityId } });
  }

  async deleteScan(id) {
    return await models.Scan.destroy({ where: { id } });
  }

  async updateScan(id, data) {
    return await models.Scan.update(data, { where: { id } });
  }

  async checkScanExists(userId, eventId, ticketId, activityId) {
    return await models.Scan.findOne({
      where: {
        user_id: userId,
        event_id: eventId,
        ticket_id: ticketId,
        activity_id: activityId,
      },
    });
  }
}

module.exports = ScanService;
