const { httpResponse } = require("../../helpers");
const { ScanService } = require("../../services");

const scansService = new ScanService();
const http = new httpResponse();

class ScanController {
  async getScan(req, res) {
    try {
      const { id } = req.params;

      const scan = await scansService.findScan(id);

      http.setSuccess(200, "Successfully loaded scan details", {
        ...scan?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to load scan details", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async createScan(req, res) {
    try {
      const { user, body } = req;

      body.scanned_by = user.id;

      const eventActivity = await scansService.findActivity(body.activity_id);

      if (!eventActivity) throw new Error("Invalid activity");

      if (!eventActivity.is_recurring) {
        const eventExists = scansService.checkScanExists(
          user.id,
          body.event_id,
          body.ticket_id,
          body.activity_id
        );

        if (eventExists)
          throw new Error(
            "The user has already been scanned for this activity"
          );
      }

      const scan = await scansService.createScan(body);

      http.setSuccess(200, "Successfully scanned user for this activity", {
        ...scan?.dataValues,
      });
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to scan qr code", {
        message: error.message,
      });
      http.send(res);
    }
  }

  async deleteScan(req, res) {
    try {
      const { id } = req.params;

      await scansService.deleteScan(id);

      http.setSuccess(200, "Successfully deleted scan");
      http.send(res);
    } catch (error) {
      http.setError(400, "Unable to delete scan", {
        message: error.message,
      });
      http.send(res);
    }
  }
}

module.exports = ScanController;
