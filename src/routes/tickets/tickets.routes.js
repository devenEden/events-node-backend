const { TicketController } = require("../../controllers");
const ticketBookingRouter = require("./ticketBooking.routes");

const ticketRouter = require("express").Router();
const controller = new TicketController();

ticketRouter.use("/booking", ticketBookingRouter);
ticketRouter.get("/:id", controller.getTicketDetails);
ticketRouter.post("/", controller.createTicket);
ticketRouter.put("/:id", controller.updateTicket);
ticketRouter.delete("/:id", controller.deleteTicket);

module.exports = ticketRouter;
