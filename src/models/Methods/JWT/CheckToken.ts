import jwt from "jsonwebtoken";
import Database from "../../../config/DatabaseConfig";

export = function checkToken(token, callback) {
  jwt.verify(token, Database.config.secretKey, function (err, decoded) {
    if (err) {
      return callback(false, null);
    } else return callback(true, decoded);
  });
};
