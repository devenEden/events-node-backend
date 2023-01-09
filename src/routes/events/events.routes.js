const { EventsController } = require("../../controllers");
const { eventImageUploader } = require("../../middleware/eventImageUpload");

const eventsRouter = require("express").Router();

const controller = new EventsController();

eventsRouter.get("/", controller.getEvents);
eventsRouter.get("/my-events", controller.getMyEvents);
eventsRouter.get("/:id", controller.getEventDetails);

eventsRouter.post("/", controller.createEvent);
eventsRouter.put("/:id", controller.updateEvent);
eventsRouter.post(
  "/images",
  eventImageUploader.single("image"),
  controller.uploadEventImages
);

eventsRouter.delete("/:id", controller.deleteEvent);

module.exports = eventsRouter;
