const path = require("path");
const { httpResponse } = require("../../helpers");
const { EventsService } = require("../../services");
const fs = require("fs");

const http = new httpResponse();
const eventsService = new EventsService();

class EventsController {
  async getEvents(req, res) {
    try {
      const events = await eventsService.findEvents();

      http.setSuccess(200, "Events retrieved successfully", { events });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get events", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async getMyEvents(req, res) {
    try {
      const { user } = req;
      const events = await eventsService.findMyEvents(user.id);

      http.setSuccess(200, "Events retrieved successfully", { events });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get events", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async getEventDetails(req, res) {
    try {
      const { id } = req.params;
      const eventDetails = await eventsService.findEventDetails(id);

      http.setSuccess(200, "Event details retrieved successfully", {
        ...eventDetails?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get events", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async createEvent(req, res) {
    try {
      const { body, user } = req;

      if (!user.is_admin)
        throw new Error("You are not authorized to create an event");

      body.user_id = user.id;

      const event = await eventsService.createEvent(body);

      http.setSuccess(200, "Successfully created event", {
        ...event?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to create event", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;

      if (!user.is_admin)
        throw new Error("You are not authorized to update an event");

      const event = await eventsService.updateEventById(req.body, id);

      http.setSuccess(200, "Successfully updated event", {
        event,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to update event", { message: error.message });
      http.send(res);
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;

      if (!user.is_admin)
        throw new Error("You are not authorized to delete an event");

      const deletedEvent = await eventsService.deleteEvent(id);

      http.setSuccess(200, "Successfully deleted event", { deletedEvent });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete event", { message: error.message });
      http.send(res);
    }
  }

  async uploadEventImages(req, res) {
    try {
      const { user, file, body } = req;
      const { eventId } = req.query;

      if (!user.is_admin)
        throw new Error("You are not authorized to upload an image");

      if (!file) throw new Error("Please upload a file");

      const file_path = path.join("/events", file.filename);

      const eventsImage = await eventsService.createEventImage({
        file_path,
        event_id: eventId,
        type: body.type,
      });

      http.setSuccess(200, "Successfully uploaded image", {
        ...eventsImage?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to upload image", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async deleteEventImage(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;

      const image = await eventsService.findEventImage(id);

      if (!user.is_admin)
        throw new Error("You are not authorized to upload an image");

      if (!image?.file_path)
        throw new Error("The file you selected does not exist");

      fs.unlink(path.join("./assets", document.data.file_path), (err) => {
        if (err)
          throw new Error("Internal server error occured while deleting image");
      });

      const deletedDocument = await eventsService.deleteEventImage(id);

      http.setSuccess(200, "Successfully deleted document", {
        deleteManualsAndPolicies: deletedDocument.data,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete document", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = EventsController;
