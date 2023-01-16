const { httpResponse } = require("../../helpers");
const {
  ScanService,
  EventsService,
  TicketsService,
  UserService,
  TicketBookingsService,
} = require("../../services");
const { emailNotificationTemplate, EmailUtil } = require("../../utils");

const scansService = new ScanService();
const eventsService = new EventsService();
const ticketService = new TicketsService();
const bookingService = new TicketBookingsService();
const http = new httpResponse();
const emailUtil = new EmailUtil();

class ScanController {
  async onScan(req, res) {
    try {
      const { body, user } = req;

      const b = body.data.split("_");
      const bookingId = b[2].split("-")[1];
      const ticketId = b[1].split("-")[1];
      const eventId = b[3].split("-")[1];
      const userId = b[0].split("-")[1];

      const booking = await bookingService.findTicketBookingDetails(bookingId);

      if (!booking) throw new Error("Internal server error");

      const eventDetails = await eventsService.findEventDetails(eventId);
      const userScan = await UserService.findOneUser({
        where: { id: userId },
      });
      const ticketDetails = await ticketService.findTicketDetails(ticketId);

      http.setSuccess(200, "Successfully loaded scan details", {
        eventDetails,
        booking,
        guest: userScan,
        scannedBy: user,
        ticket: ticketDetails,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to load details", {
        message: error.message,
      });
      http.send(res);
    }
  }
  async getScan(req, res) {
    try {
      const { id } = req.params;

      const scan = await scansService.findScan(id);

      http.setSuccess(200, "Successfully loaded scan details", {
        ...scan?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to load scan details", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async createScan(req, res) {
    try {
      const { user, body } = req;

      body.scanned_by = user.id;

      const eventActivity = await scansService.findActivity(body.activity_id);

      if (!eventActivity) throw new Error("Invalid activity");

      if (!eventActivity.is_recurring) {
        const eventExists = scansService.checkScanExists(
          body.user_id,
          body.event_id,
          body.ticket_id,
          body.activity_id
        );

        if (eventExists)
          throw new Error(
            "The user has already been scanned for this activity"
          );
      }

      const scan = await scansService.createScan(body);

      const guest = await UserService.findOneUser({
        where: { id: body.user_id },
      });

      const emailMessage = emailNotificationTemplate(
        "eventsApp",
        `${guest?.surname} ${guest?.other_names}`,
        `You have been scanned for ${eventActivity?.name}`
      );

      emailUtil.sendMessage(
        guest.email,
        "EVENTS APP NOTIFICATION",
        emailMessage
      );

      http.setSuccess(200, "Successfully scanned user for this activity", {
        ...scan?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to scan qr code", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async deleteScan(req, res) {
    try {
      const { id } = req.params;

      await scansService.deleteScan(id);

      http.setSuccess(200, "Successfully deleted scan");
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete scan", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = ScanController;
