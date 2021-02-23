import User from "../DatabaseHandler";
import Validator from "../Methods/Validators/AuthValidator";
import signToken from "../Methods/JWT/SignToken";

export default class AuthHandler {
  private _clientData;

  constructor(clientData) {
    this._clientData = clientData.body;
  }

  /**
   * Authenticate user with login and password
   */
  public auth(callback) {
    let regVal = new Validator();

    regVal.login = this._clientData.login;
    regVal.password = this._clientData.password;

    regVal.validate(regVal, (errors) => {
      if (errors)
        return callback(0, `ERR_INCORRECT_${errors[0].toUpperCase()}`, null);
      else {
        User.getUserInfoByLogin({ login: regVal.login }, (err, user) => {
          if (err) throw err;
          if (!user) return callback(0, `ERR_USER_NOT_FOUND`, null);
          else {
            User.comparePass(regVal.password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (!isMatch) return callback(0, `ERR_PASSWORD_NOT_MATCH`, null);
              else {
                signToken(user.login, (token) => {
                  return callback(1, `SUCCESS`, { token });
                });
              }
            });
          }
        });
      }
    });
  }
}
