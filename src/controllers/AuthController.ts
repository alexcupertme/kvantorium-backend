import User from "../models/DatabaseHandler";

class AuthController {
  constructor() {}

  defaultMethod(clientRequest, callback) {
    User.getUserInfoByLogin(
      {
        login: clientRequest.body.login,
      },
      (err, user) => {
        if (err) throw err;
        if (user) {
          User.comparePass(
            clientRequest.body.password,
            user.password,
            (err, result) => {
              if (err) throw err;
              return callback(result);
            }
          );
        }
      }
    );
  }
}

export = new AuthController();
