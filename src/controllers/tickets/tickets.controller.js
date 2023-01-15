const { httpResponse } = require("../../helpers");
const { TicketsService } = require("../../services");

const http = new httpResponse();

const ticketsService = new TicketsService();

class TicketController extends TicketsService {
  async getTicketDetails(req, res) {
    try {
      const { id } = req.params;

      const ticketDetails = await ticketsService.findTicketDetails(id);

      http.setSuccess(200, "Ticket details retrieved successfully", {
        ...ticketDetails?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get ticket details", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async createTicket(req, res) {
    try {
      const { body } = req;

      const ticket = await ticketsService.createTickets(body);

      http.setSuccess(200, "Ticket created successfully", {
        ...ticket?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to create ticket details", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async updateTicket(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      const ticket = await ticketsService.updateTickets(id, body);

      http.setSuccess(200, "Ticket updated successfully", { ticket });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to create ticket", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async deleteTicket(req, res) {
    try {
      const { id } = req.params;

      const ticket = await ticketsService.deleteTickets(id);

      http.setSuccess(200, "Ticket deleted successfully", { ticket });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete ticket", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = TicketController;
