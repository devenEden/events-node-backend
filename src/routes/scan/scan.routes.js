const { ScanController } = require("../../controllers");

const scansRouter = require("express").Router();

const controller = new ScanController();

scansRouter.get("/:id", controller.getScan);
scansRouter.post("/", controller.createScan);
scansRouter.delete("/:id", controller.deleteScan);

module.exports = scansRouter;
