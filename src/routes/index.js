const express = require("express");
const usersRouter = require("./users/users.routes");
const router = express.Router();

/* GET home page. */
const prefix = "/api/v1";

router.use(`${prefix}/users`, usersRouter);
router.get("/", (req, res) => {
  res.send("Events App Server!");
});

module.exports = router;
