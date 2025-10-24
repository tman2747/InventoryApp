const { body, validationResult, matchedData } = require("express-validator");
const { getAllgames, addDev, getAllDevs } = require("../models/queries");

exports.sendIndex = async (req, res, next) => {
  console.log(await getAllgames());
  res.render("index", {
    stuff: "you can send stuff to ejs here",
    games: await getAllgames(),
  });
};
exports.createGame = async (req, res, next) => {
  const devs = await getAllDevs();
  res.render("createGame", { devs: devs });
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

exports.sendDevPost = [
  validateDevPost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.errors);
      return;
    }

    await addDev(matchedData(req).devName);
    res.redirect("/create/dev");
  },
];

exports.getGenres = (req, res, next) => {
  const genres = {};
  res.render("addGenre", { genres: genres });
};
