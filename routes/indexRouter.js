const express = require("express");
const indexContoller = require("../controller/indexContoller");
const indexRouter = express.Router();

indexRouter.get("/", indexContoller.sendIndex);
indexRouter.get("/{*error}", (req, res) => {
  res
    .status(404)
    .send("404 page not found. within index router (not controller)");
});

module.exports = { indexRouter };
