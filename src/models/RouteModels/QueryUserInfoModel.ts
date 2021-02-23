import User from "../DatabaseHandler";
import Validator from "../Methods/Validators/QueryUserInfoValidator";
import checkToken from "../Methods/JWT/CheckToken";

export default class AuthHandler {
  private _clientData;

  constructor(clientData) {
    this._clientData = clientData.body;
  }

  /**
   * Authenticate user with login and password
   */
  public queryUserInfo(callback) {
    let regVal = new Validator();

    regVal.token = this._clientData.token;

    regVal.name = this._clientData.name;
    regVal.description = this._clientData.description;
    regVal.login = this._clientData.login;
    regVal.role = this._clientData.role;

    regVal.validate(regVal, (errors) => {
      if (errors)
        return callback(0, `ERR_INCORRECT_${errors[0].toUpperCase()}`, null);
      else {
        checkToken(regVal.token, (isValid, decoded) => {
          if (!isValid) return callback(0, `ERR_TOKEN_EXPIRED`, null);
          else {
            User.getUserInfoByLogin({ login: decoded.data }, (err, user) => {
              if (err) throw err;
              if (!user)
                return callback(0, `ERR_USER_BY_TOKEN_NOT_FOUND`, null);
              else {
                User.getQueryUserInfo(regVal, (err, user) => {
                  if (err) throw err;
                  if (!user) return callback(0, `ERR_USERS_NOT_FOUND`, null);
                  else return callback(1, `SUCCESS`, user);
                });
              }
            });
          }
        });
      }
    });
  }
}
