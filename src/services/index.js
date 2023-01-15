const EventsService = require("./events/events.service");
const TicketBookingsService = require("./tickets/ticketBooking.service");
const TicketsService = require("./tickets/tickets.service");
const UserService = require("./Users/users.service");

module.exports = {
  UserService,
  EventsService,
  TicketBookingsService,
  TicketsService,
};
