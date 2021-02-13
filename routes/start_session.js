const express = require("express");
const router = express.Router();
const checkToken = require("../models/jwt");

router.post("/", (req, res) => {
  checkToken(req.body.token, (valid) => {
    if (!valid) {
      return res.json({
        exitCode: "ERR_INVALID_TOKEN",
      });
    } else
      return res.json({
        exitCode: "SUCCESS",
      });
  });
});

module.exports = router;
