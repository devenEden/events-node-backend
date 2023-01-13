const express = require("express");
const loginRequired = require("../middleware/authRoute");
const eventsRouter = require("./events/events.routes");
const usersRouter = require("./users/users.routes");
const staffRouter = require("./staff/staff.routes");
const eventActivitiesRouter = require("./events/eventActivities.routes");
const router = express.Router();

/* GET home page. */
const prefix = "/api/v1";

router.get("/", (req, res) => {
  res.json("Events App Server!");
});
router.use(`${prefix}/users`, usersRouter);
router.use(`${prefix}/events`, loginRequired, eventsRouter);
router.use(`${prefix}/staff`, loginRequired, staffRouter);
router.use(`${prefix}/event-activities`, loginRequired, eventActivitiesRouter);

module.exports = router;
