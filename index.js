const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
var server = require("http").createServer(app);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Главная страница сайта!");
});

server.listen(PORT, () => {
  console.log("Running at Port " + PORT);
});
