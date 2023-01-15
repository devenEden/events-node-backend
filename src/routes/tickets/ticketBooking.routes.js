const { TicketBookingController } = require("../../controllers");

const ticketBookingRouter = require("express").Router();
const controller = new TicketBookingController();

ticketBookingRouter.get("/user", controller.getMyTicketBookings);
ticketBookingRouter.get("/:id", controller.getBookingDetails);
ticketBookingRouter.post("/", controller.createTicketBooking);
ticketBookingRouter.put("/:id", controller.updateTicketBooking);
ticketBookingRouter.delete("/:id", controller.deleteTicketBooking);

module.exports = ticketBookingRouter;
