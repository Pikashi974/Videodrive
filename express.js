const express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const port = 8000;
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/src/js", express.static("src/js"));
app.use("/src/css", express.static("src/css"));
app.get("/product/:id", (req, res) => {
  res.sendFile(path.resolve(`./product.html`));
});
app.get("/", (req, res) => {
  res.sendFile(path.resolve(`./index.html`));
});
app.get("/:id", (req, res) => {
  res.sendFile(path.resolve(`./${req.params.id}.html`));
});
// app.get("/:id/:search", (req, res) => {
//   res.sendFile(path.resolve(`./${req.params.id}.html`));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
