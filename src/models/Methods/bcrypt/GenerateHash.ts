import bcrypt from "bcrypt";
import ErrorHandler from "../ErrorHandler";

export = function genHash(data, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return callback(err);
    bcrypt.hash(data, salt, (err, hash) => {
      return callback(err, hash);
    });
  });
};
