const jwt = require("jsonwebtoken");
const config = require("../config/db");

module.exports = function checkToken(token, callback) {
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return callback(false);
    } else return callback(true, decoded);
  });
};
