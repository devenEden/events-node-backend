const express = require("express");
const loginRequired = require("../middleware/authRoute");
const eventsRouter = require("./events/events.routes");
const ticketRouter = require("./tickets/tickets.routes");
const usersRouter = require("./users/users.routes");
const router = express.Router();

/* GET home page. */
const prefix = "/api/v1";

router.get("/", (req, res) => {
  res.json("Events App Server!");
});
router.use(`${prefix}/users`, usersRouter);
router.use(`${prefix}/events`, loginRequired, eventsRouter);
router.use(`${prefix}/tickets`, loginRequired, ticketRouter);

module.exports = router;
