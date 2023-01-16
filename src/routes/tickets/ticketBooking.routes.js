const { TicketBookingController } = require("../../controllers");

const ticketBookingRouter = require("express").Router();
const controller = new TicketBookingController();

ticketBookingRouter.get("/my-bookings", controller.getMyTicketBookings);
ticketBookingRouter.get("/:id", controller.getBookingDetails);
ticketBookingRouter.post("/", controller.createTicketBooking);
ticketBookingRouter.put("/:id", controller.updateTicketBooking);
ticketBookingRouter.delete("/:id", controller.deleteTicketBooking);

module.exports = ticketBookingRouter;
