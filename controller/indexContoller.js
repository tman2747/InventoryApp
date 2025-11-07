const { body, validationResult, matchedData } = require("express-validator");
const {
  getAllgames,
  addDev,
  getAllDevs,
  getAllGenres,
  addGenre,
  addGame,
  deleteGameQuery,
} = require("../models/queries");

exports.sendIndex = async (req, res, next) => {
  res.render("index", {
    stuff: "you can send stuff to ejs here",
    games: await getAllgames(),
  });
};
exports.createGame = async (req, res, next) => {
  const devs = await getAllDevs();
  const genres = await getAllGenres();
  res.render("createGame", { devs: devs, genres: genres });
};
exports.postGame = async (req, res, next) => {
  let game = req.body.gameName;
  let genre = req.body.genre;
  let dev = req.body.developer;
  if (!Array.isArray(genre)) {
    genre = [genre];
  }
  if (!Array.isArray(dev)) {
    dev = [dev];
  }
  addGame(game, genre, dev);
  res.redirect("/create/game");
};

exports.addDev = async (req, res, next) => {
  const devs = await getAllDevs();
  res.render("addDev", { devs: devs });
};

const validateDevPost = [
  body("devName")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("must be between 2 and 30 chars"),
];
const validateGenre = [
  body("genreName")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("must be between 2 and 30 chars"),
];
exports.sendDevPost = [
  validateDevPost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.errors);
      res.redirect("/create/dev");
      return;
    }

    await addDev(matchedData(req).devName);
    res.redirect("/create/dev");
  },
];

exports.addGenre = [
  validateGenre,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.errors);
      res.redirect("/create/genre");
      return;
    }
    await addGenre(matchedData(req).genreName);
    res.redirect("/create/genre");
  },
];

exports.getGenres = async (req, res, next) => {
  const genres = await getAllGenres();
  res.render("addGenre", { genres: genres });
};

// exports.getGame = async (req, res, next) => {
//   console.log(req.params.id);
//   res.render("gameID");
// };

exports.deleteGame = async (req, res, next) => {
  if (req.body.update) {
    console.log(true);
  }
  await deleteGameQuery(req.body.id);
  res.redirect("/");
};
