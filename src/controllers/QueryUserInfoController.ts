import User from "../models/DatabaseHandler";

class QueryUserInfoController {
  constructor() {}

  defaultMethod(clientRequest, callback) {
    User.getQueryUserInfo(clientRequest.body, (err, user) => {
      if (err) throw err;
      return callback(user);
    });
  }
}

export = new QueryUserInfoController();
