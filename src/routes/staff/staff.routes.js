const express = require("express");
const StaffController = require("../../controllers/staff/staff.controller");

const staffRouter = express.Router();

const controller = new StaffController();

staffRouter.post("/", controller.createStaff);
staffRouter.get("/details/:id", controller.getStaffDetails);
staffRouter.put("/:id", controller.updateStaff);
staffRouter.delete("/:id", controller.deleteStaff);

module.exports = staffRouter;
