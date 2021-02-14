const express = require("express");
const router = express.Router();
const checkToken = require("../../models/jwt");
const User = require("../../models/user");
const validators = require("../../models/validators/validators");

function checkData(userdata, userdb) {
  for (let key in userdata) {
    if (
      userdata[key] == undefined ||
      userdata[key] == null ||
      userdata[key] == ""
    ) {
      userdata[key] = userdb[key];
    }
  }
  console.log(userdata);
}

router.post("/", (req, res) => {
  checkToken(req.body.token, (valid, decoded) => {
    if (!valid) {
      return res.json({
        exitCode: "ERR_INVALID_TOKEN",
      });
    } else {
      let username = decoded.data;
      User.getUserByLogin(username, (err, userdb) => {
        if (err) throw err;
        if (!userdb) {
          return res.json({
            exitCode: "ERROR_USER_NOT_FOUND",
          });
        } else {
          let userdata = {
            mail: req.body.mail,
            login: req.body.login,
            name: req.body.name,
            description: req.body.description,
            skills: req.body.skills,
            achievements: req.body.achievements,
            kvantums: req.body.kvantums,
          };
          checkData(userdata, userdb);
          console.log(validators.checkNickname("dawd5one"));
          // console.log(userdata);
          // User.changeUserByLogin(userdata, username);
          return res.json({
            exitCode: "SUCCESS",
          });
        }
      });
    }
  });
});

module.exports = router;
