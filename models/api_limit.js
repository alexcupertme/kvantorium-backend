const rateLimit = require("express-rate-limit");

module.exports = {
  auth: rateLimit({
    windowMs: 1 * 60 * 1000, // 15 auth per min
    max: 15,
  }),
  register: rateLimit({
    windowMs: 1 * 60 * 1000, // 5 registrations per min
    max: 10,
  }),
  setUserInfo: rateLimit({
    windowMs: 1 * 60 * 1000, // 30 profile changing per min
    max: 30,
  }),
  getUserInfo: rateLimit({
    windowMs: 1 * 60 * 1000, // 200 profile checking per min
    max: 200,
  }),
};
