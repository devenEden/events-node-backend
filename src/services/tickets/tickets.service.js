const models = require("../../../database/models");

class TicketsService {
  async findTicketDetails(id) {
    return await models.Ticket.findOne({
      where: { id },
      include: [
        {
          association: models.Ticket.event,
          attributes: ["id", "title"],
        },
        {
          association: models.Ticket.bookings,
          attributes: ["id"],
        },
      ],
    });
  }

  async createTickets(ticket) {
    return await models.Ticket.create(ticket);
  }

  async updateTickets(id, ticket) {
    return await models.Ticket.update(ticket, {
      where: { id },
      returning: true,
    });
  }

  async deleteTickets(id) {
    return await models.Ticket.destroy({ where: { id } });
  }
}

module.exports = TicketsService;
