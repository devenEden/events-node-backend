const appConfig = require("../../../config/appConfig");
const { httpResponse } = require("../../helpers");
const generatePdf = require("../../helpers/pdfGenerator");
const generateQrCode = require("../../helpers/qrcode");
const { TicketBookingsService } = require("../../services");
const { EmailUtil, emailNotificationTemplate } = require("../../utils");
const fs = require("fs");
const http = new httpResponse();
const ticketBookingService = new TicketBookingsService();
const emailUtil = new EmailUtil();

class TicketBookingController {
  async createTicketBooking(req, res) {
    try {
      const { body, user } = req;

      body.user_id = user.id;

      const bookingExists = await ticketBookingService.checkBookingExists(
        body.event_id,
        user.id,
        body.ticket_id
      );

      if (bookingExists)
        throw new Error("You have already booked a ticket for this event");

      const ticket = await ticketBookingService.findTicket(body.ticket_id);

      if (!ticket) throw new Error("Invalid ticket");

      if (ticket?.bookings?.length >= ticket.available_quantity)
        throw new Error("Tickets not available");

      const ticketBooking = await ticketBookingService.createTicketBooking(
        body
      );

      const qrcode = generateQrCode(
        `${appConfig.APP_CLIENT}/events/u-${user.id}_t-${ticket.id}_tb-${ticketBooking.id}_e-${ticket.event.id}`
      );

      const ticketPdf = generatePdf({
        ownerName: `${user.surname} ${user.other_names}`,
        ticketName: ticket.name,
        eventName: ticket.event?.title,
        fileName: `u-${user.id}_t-${ticket.id}_tb-${ticketBooking.id}_e-${ticket.event.id}`,
        qrcode,
        time: `From ${new Date(
          ticket?.event?.start_date
        ).toDateString()} ${new Date(
          ticket?.event?.start_date
        ).toTimeString()} To ${new Date(
          ticket?.event?.end_date
        ).toDateString()} ${new Date(ticket?.event?.end_date).toTimeString()}`,
      });

      const attachmentFile = fs.readFileSync(ticketPdf).toString("base64");

      emailUtil.setAttachmentOptions(
        attachmentFile,
        `${user.surname} ${user.other_names} ${ticket?.event?.title} Ticket.pdf`
      );

      const attachment = emailUtil.getAttachmentOptions();

      const emailMessage = emailNotificationTemplate(
        appConfig.APP_NAME,
        `${user.surname} ${user.other_names}`,
        `You have successfully booked a ${ticket.name} ticket for the event ${ticket.event.title}`,
        [attachment]
      );

      emailUtil.sendMessage(
        user.email,
        `${ticket.event.title} Ticket Booked`,
        emailMessage,
        [attachment]
      );

      http.setSuccess(200, "Successfully created ticket booking", {
        ...ticketBooking?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to book ticket", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async updateTicketBooking(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;

      const ticketBooking = await ticketBookingService.updateTicketBooking(
        id,
        body
      );

      http.setSuccess(200, "Successfully updated ticket booking", {
        ticketBooking,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to update ticket booking", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async deleteTicketBooking(req, res) {
    try {
      const { id } = req.params;

      const ticketBooking = await ticketBookingService.deleteTicketBooking(id);

      http.setSuccess(200, "Successfully deleted ticket booking", {
        ticketBooking,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to update ticket booking", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async getBookingDetails(req, res) {
    try {
      const { id } = req.params;

      const ticket = await ticketBookingService.findTicketBookingDetails(id);

      http.setSuccess(200, "Ticket details retrieved successfully", {
        ...ticket?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get ticket details", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async getMyTicketBookings(req, res) {
    try {
      const { user } = req;
      const ticketBookings =
        await ticketBookingService.findTicketBookingByOwner(user.id);

      http.setSuccess(200, "Ticket bookings retrieved successfully", {
        ticketBookings,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get ticket bookings", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = TicketBookingController;
