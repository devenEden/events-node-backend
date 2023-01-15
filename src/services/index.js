const EventsService = require("./events/events.service");
const TicketBookingsService = require("./tickets/ticketBooking.service");
const TicketsService = require("./tickets/tickets.service");
const UserService = require("./Users/users.service");
const StaffService = require("./staff/staff.service");
const EventActivitiesService = require("./events/eventActivities.service");
const ScanService = require("./scans/scans.service");

module.exports = {
  UserService,
  EventsService,
  TicketBookingsService,
  TicketsService,
  StaffService,
  EventActivitiesService,
  ScanService,
};
