const EventsController = require("./events/events.controller");
const TicketBookingController = require("./tickets/ticketBooking.controller");
const TicketController = require("./tickets/tickets.controller");
const UserController = require("./users/users.controller");

module.exports = {
  UserController,
  EventsController,
  TicketController,
  TicketBookingController,
};
