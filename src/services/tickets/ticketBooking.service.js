const models = require("../../../database/models");

class TicketBookingsService {
  async findTicketBookingByOwner(id) {
    return await models.TicketBooking.findAll({
      where: { user_id: id },
      include: [
        {
          association: models.TicketBooking.event,
          attributes: ["id", "title"],
        },
        {
          association: models.TicketBooking.user,
          attributes: ["id", "surname", "other_names", "email", "contact"],
        },
      ],
    });
  }

  async checkBookingExists(eventId, userId, ticketId) {
    return await models.TicketBooking.findOne({
      where: {
        event_id: eventId,
        user_id: userId,
        ticket_id: ticketId,
      },
    });
  }

  async findTicket(id) {
    return await models.Ticket.findOne({
      where: { id },
      include: [
        {
          association: models.Ticket.bookings,
          attributes: ["id"],
        },
        {
          association: models.Ticket.event,
          attributes: ["id", "title", "start_date", "end_date"],
        },
      ],
    });
  }
  async findTicketBookingDetails(id) {
    return await models.TicketBooking.findOne({
      where: { id },
      include: [
        {
          association: models.TicketBooking.event,
          attributes: ["id", "title"],
        },
        {
          association: models.TicketBooking.ticket,
          attributes: ["id", "name"],
        },
        {
          association: models.TicketBooking.user,
          attributes: ["id", "surname", "other_names", "email", "contact"],
        },
      ],
    });
  }

  async createTicketBooking(ticket) {
    return await models.TicketBooking.create(ticket);
  }

  async updateTicketBooking(id, ticket) {
    return await models.TicketBooking.update(ticket, {
      where: { id },
      returning: true,
    });
  }

  async deleteTicketBooking(id) {
    return await models.TicketBooking.destroy({ where: { id } });
  }
}

module.exports = TicketBookingsService;
