const { EventsController } = require("../../controllers");
const loginRequired = require("../../middleware/authRoute");
const { eventImageUploader } = require("../../middleware/eventImageUpload");

const eventsRouter = require("express").Router();

const controller = new EventsController();

eventsRouter.get("/", controller.getEvents);
eventsRouter.get("/my-events", loginRequired, controller.getMyEvents);
eventsRouter.get("/:id", controller.getEventDetails);

eventsRouter.post("/", loginRequired, controller.createEvent);
eventsRouter.put("/:id", loginRequired, controller.updateEvent);
eventsRouter.post(
  "/images",
  eventImageUploader.single("image"),
  controller.uploadEventImages
);

eventsRouter.delete("/:id", loginRequired, controller.deleteEvent);

module.exports = eventsRouter;
