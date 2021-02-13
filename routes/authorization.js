const express = require("express");
const User = require("../models/user");
const router = express.Router();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const config = require("../config/db");

let checkDataLogin = function (login, password) {
  if (validator.isEmpty(login) || validator.isEmpty(password)) {
    return "ERROR_EMPTY_FIELD";
  } else if (!(3 <= login.length <= 30) || !(1 <= mail.length)) {
    return "ERROR_BAD_LENGTH";
  } else return "SUCCESS";
};

router.post("/", (req, res) => {
  let user = new User({
    login: req.body.login,
    password: req.body.password,
  });
  res.header("Access-Control-Allow-Origin", "*");
  User.getUserByLogin(user.login, (err, userlogin) => {
    if (err) throw err;
    if (!userlogin)
      return res.json({
        exitCode: "ERR_USER_NOT_FOUND",
      });
    User.comparePass(user.password, userlogin.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: user.login,
          },
          config.secret
        );
        return res.json({
          exitCode: "SUCCESS",
          token: token,
        });
      } else
        return res.json({
          exitCode: "ERR_INCORRECT_PASSWORD",
        });
    });
  });
});

router.get("/", (req, res) => {
  console.log("Пользователь зашел на страницу авторизации");
});

module.exports = router;
