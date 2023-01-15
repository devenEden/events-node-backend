const { httpResponse } = require("../../helpers");
const { EventActivitiesService } = require("../../services");

const http = new httpResponse();

class EventActivitiesController {
  async getEventActivities(req, res) {
    try {
      const { id } = req.params;
      const activities = await EventActivitiesService.findEventActivities(id);

      http.setSuccess(200, "Event activities retrieved.", { activities });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get event activities.", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async getEventActivityDetails(req, res) {
    try {
      const { id } = req.params;
      const activity = await EventActivitiesService.findOneEventActivity(id);

      http.setSuccess(200, "Event activity details retrieved.", { activity });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get event activity details.", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async createEventActivity(req, res) {
    try {
      const { body } = req;
      const activity = await EventActivitiesService.addEventActivity(body);

      http.setSuccess(200, "Added event activity successfully.", {
        ...activity?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to add activity.", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async updateEventActivity(req, res) {
    try {
      const { id } = req.params;
      const event = await EventActivitiesService.updateEventActivity(
        req.body,
        id
      );

      http.setSuccess(200, "Successfully updated event activity.", {
        event,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to update event activity", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async deleteEventActivity(req, res) {
    try {
      const { id } = req.params;
      const deletedEventActivity = await EventActivitiesService.destroyStaff(
        id
      );

      http.setSuccess(200, "Successfully deleted event activity.", {
        deletedEventActivity,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete event activity.", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = EventActivitiesController;
