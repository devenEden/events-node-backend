const { httpResponse } = require("../../helpers");
const { StaffService } = require("../../services");

const http = new httpResponse();

class StaffController {
  async getStaffDetails(req, res) {
    try {
      const { id } = req.params;
      const staff = await StaffService.findOneStaff(id);

      http.setSuccess(200, "Staff details retrieved.", { staff });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to get staff details.", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async createStaff(req, res) {
    try {
      const { body, user } = req;

      body.user_id = user.id;

      const staff = await StaffService.addStaff(body);

      http.setSuccess(200, "Create staff successful.", {
        ...staff?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to create staff.", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async updateStaff(req, res) {
    try {
      const { id } = req.params;

      const event = await StaffService.updateStaff(req.body, id);

      http.setSuccess(200, "Successfully updated staff.", {
        event,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to update staff", { message: error.message });
      http.send(res);
    }
  }

  async deleteStaff(req, res) {
    try {
      const { id } = req.params;

      const deletedStaff = await StaffService.destroyStaff(id);

      http.setSuccess(200, "Successfully deleted staff.", { deletedStaff });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete staff.", { message: error.message });
      http.send(res);
    }
  }
}

module.exports = StaffController;
