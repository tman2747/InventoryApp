exports.sendIndex = (req, res, next) => {
  res.render("index", { stuff: "you can send stuff to ejs here" });
};
exports.createGame = (req, res, next) => {
  res.render("createGame");
};
