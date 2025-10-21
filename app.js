const express = require("express");
const path = require("node:path");
const { indexRouter } = require("./routes/indexRouter");

const app = express();
// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .send("uncaught error in contact TristonSquad for support", err);
});

// server
app.listen(PORT, (error) => {
  if (error) {
    throw error();
  }
  console.log(`app running on http://localhost:${PORT}`);
});
