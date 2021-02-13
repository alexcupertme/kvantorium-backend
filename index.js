const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const rateLimit = require("express-rate-limit");

const getUserInfo = require("./routes/userinfo/getuserinfo");
const setUserInfo = require("./routes/userinfo/setuserinfo");

const authorization = require("./routes/authorization");
const registration = require("./routes/registration");
const startSession = require("./routes/start_session");
const config = require("./config/db");

const PORT = process.env.PORT || 3000;
var server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});
app.use(limiter);

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to our database");
});
mongoose.connection.on("error", (err) => {
  console.log(`We cant connect to our database\n${err}`);
});

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Главная страница сайта!");
});

app.use("/reg", registration);
app.use("/start_session", startSession);
app.use("/auth", authorization);
app.use("/getuserinfo", getUserInfo);
app.use("/setuserinfo", setUserInfo);

server.listen(PORT, () => {
  console.log("Running at Port " + PORT);
});
