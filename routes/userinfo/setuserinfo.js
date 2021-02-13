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
      User.getUserByLogin(decoded.login, (err, userlogin) => {
        if (err) throw err;
        if (!userlogin) {
          return res.json({
            exitCode: "ERROR_USER_NOT_FOUND",
          });
        } else console.log(userlogin);
      });
    }
  });
});

module.exports = router;
