const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: String,
  mail: String,
  login: String,
  password: String,
  name: {
    first: String,
    second: String,
  },
  description: String,
  skills: [
    {
      id: Number,
      name: String,
      description: String,
    },
  ],
  achievements: [{ name: String }],
  kvantums: [
    {
      kvantum: String,
      level: String,
    },
  ],
  registerMinute: Number,
  registerHour: Number,
  registerDate: Number,
  registerMonth: Number,
  registerYear: Number,
  role: String, // Available roles:
  // Moderator
  // Teacher
  // Verified user
  // User
  // Banned
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserByLogin = function (login, callback) {
  const query = { login: login };
  User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
  User.findOne(id, callback);
};

module.exports.getUserByMail = function (mail, callback) {
  const query = { mail: mail };
  User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePass = function (passFromUser, userDBPass, callback) {
  if (passFromUser == undefined) return false;
  bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
