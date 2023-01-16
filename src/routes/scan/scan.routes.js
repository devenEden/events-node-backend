const { ScanController } = require("../../controllers");
const loginRequired = require("../../middleware/authRoute");

const scansRouter = require("express").Router();

const controller = new ScanController();

scansRouter.get("/:id", loginRequired, controller.getScan);
scansRouter.post("/", loginRequired, controller.createScan);
scansRouter.post("/on-scan", controller.onScan);
scansRouter.delete("/:id", loginRequired, controller.deleteScan);

module.exports = scansRouter;
