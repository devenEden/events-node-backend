const express = require("express");
const EventActivitiesController = require("../../controllers/events/eventActivities.controller");

const eventActivitiesRouter = express.Router();

const controller = new EventActivitiesController();

eventActivitiesRouter.post("/", controller.createEventActivity);
eventActivitiesRouter.get("/details/:id", controller.getEventActivityDetails);
eventActivitiesRouter.get("/:id", controller.getEventActivities);
eventActivitiesRouter.put("/:id", controller.updateEventActivity);
eventActivitiesRouter.delete("/:id", controller.deleteEventActivity);

module.exports = eventActivitiesRouter;
