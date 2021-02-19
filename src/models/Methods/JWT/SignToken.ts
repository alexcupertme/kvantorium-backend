import jwt from "jsonwebtoken";
import Database from "../../../config/DatabaseConfig";

export = function signToken(data, callback) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: data,
    },
    Database.config.secretKey
  );
  return callback(token);
};
