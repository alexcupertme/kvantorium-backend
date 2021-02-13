const express = require("express");
const router = express.Router();
const checkToken = require("../../models/jwt");
const User = require("../../models/user");

router.post("/", (req, res) => {
  checkToken(req.body.token, (valid) => {
    if (!valid) {
      return res.json({
        exitCode: "ERR_INVALID_TOKEN",
      });
    } else {
      User.getUserByLogin(req.body.login, (err, userlogin) => {
        if (err) throw err;
        if (!userlogin) {
          return res.json({
            exitCode: "ERROR_USER_NOT_FOUND",
          });
        } else
          return res.json({
            name: {
              first: userlogin.name.first,
              second: userlogin.name.second,
            },
            login: userlogin.login,
            description: userlogin.description,
            skills: [
              {
                id: userlogin.skills.id,
                name: userlogin.skills.name,
                description: userlogin.skills.description,
              },
            ],
            achievements: [
              {
                name: userlogin.achievements.name,
              },
            ],
            kvantums: [
              {
                kvantum: userlogin.kvantums.kvantum,
                level: userlogin.kvantums.level,
              },
            ],
            registerDate: userlogin.registerDate,
            role: userlogin.role,
          });
      });
    }
  });
});

module.exports = router;
