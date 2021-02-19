import bcrypt from "bcrypt";

export = function comparePass(passFromUser, userDBPass, callback) {
  if (passFromUser == undefined) return false;
  bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
