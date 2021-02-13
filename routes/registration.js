const express = require("express");
const User = require("../models/user");
const router = express.Router();
const validator = require("validator");

let checkDataRegister = function (login, name, mail, password) {
  if (
    validator.isEmpty(login) ||
    validator.isEmpty(name) ||
    validator.isEmpty(mail) ||
    validator.isEmpty(password)
  ) {
    return "ERROR_EMPTY_FIELD";
  } else if (
    !(3 <= login.length <= 30) ||
    !(1 <= name.length <= 50) ||
    !(1 <= mail.length)
  ) {
    return "ERROR_BAD_LENGTH";
  } else if (!validator.isEmail(mail)) {
    return "ERROR_BAD_EMAIL";
  } else if (!validator.isStrongPassword(password)) {
    return "ERROR_BAD_PASSWORD";
  } else return "SUCCESS";
};

router.post("/", (req, res) => {
  let date = new Date();
  let user = new User({
    mail: req.body.mail,
    login: req.body.login,
    password: req.body.password,
    name: {
      first: req.body.name,
      second: "",
    },
    description: "",
    skills: [
      {
        id: "",
        name: "",
        description: "",
      },
    ],
    achievements: [{ name: "" }],
    kvantums: [
      {
        kvantum: "",
        level: "",
      },
    ],
    registerDate: date,
    role: "user",
  });
  let checkRes = checkDataRegister(
    user.login,
    user.name.first,
    user.mail,
    user.password
  );
  if (checkRes === "SUCCESS") {
    User.getUserByLogin(user.login, (err, userlogin) => {
      if (err) throw err;
      if (!userlogin) {
        User.getUserByMail(user.mail, (err, mail) => {
          if (err) throw err;
          if (!mail) {
            User.addUser(user, (err, user) => {
              if (err) {
                console.log(err);
                return res.json({ exitCode: "ERROR_USER_NOT_ADDED" });
              } else {
                return res.json({
                  exitCode: checkRes,
                });
              }
            });
          } else return res.json({ exitCode: "ERROR_MAIL_HAS_REGISTERED" });
        });
      } else return res.json({ exitCode: "ERROR_USER_ALREADY_EXISTS" });
    });
  } else return res.json({ exitCode: checkRes });
});

router.get("/", (req, res) => {
  console.log("Пользователь зашел на страницу регистрации");
});

module.exports = router;
