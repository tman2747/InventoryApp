const express = require("express");
const indexContoller = require("../controller/indexContoller");
const indexRouter = express.Router();

indexRouter.post("/create/genre", indexContoller.addGenre);
indexRouter.get("/create/genre", indexContoller.getGenres);
indexRouter.post("/create/dev", indexContoller.sendDevPost);
indexRouter.get("/create/dev", indexContoller.addDev);
indexRouter.post("/create/game", indexContoller.postGame);
indexRouter.get("/create/game", indexContoller.createGame);
indexRouter.post("/", indexContoller.deleteGame);
indexRouter.get("/", indexContoller.sendIndex);
indexRouter.get("/{*error}", (req, res) => {
  res
    .status(404)
    .send("404 page not found. within index router (not controller)");
});
indexRouter.post("/{*error}", (req, res) => {
  res
    .status(404)
    .send(
      "could not post because route is not defined or is overwritten by index router"
    );
});

module.exports = { indexRouter };
