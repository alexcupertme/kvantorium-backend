const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  jwt.verify(req.body.token, "awdawdawdawd", function (err, decoded) {
    if (err) {
      console.log(err);
      return res.json({
        success: "ERR_INVALID_TOKEN",
      });
    } else
      return res.json({
        success: "SUCCESS",
      });
  });
});

module.exports = router;
