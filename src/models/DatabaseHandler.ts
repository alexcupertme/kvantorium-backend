import getQueryUserInfo from "./Methods/DatabaseMethods/GetQueryUserInfo";
import addUser from "./Methods/DatabaseMethods/AddUser";
import comparePass from "./Methods/DatabaseMethods/ComparePassword";
import getUserInfoByLogin from "./Methods/DatabaseMethods/GetUserInfoByLogin";

class User {
  public getQueryUserInfo(query, callback) {
    return getQueryUserInfo(query, callback);
  }
  public getUserInfoByLogin(query, callback) {
    return getUserInfoByLogin(query, callback);
  }
  public addUser(data, callback) {
    return addUser(data, callback);
  }
  public comparePass(passFromUser, userDBPass, callback) {
    return comparePass(passFromUser, userDBPass, callback);
  }

  constructor() {}
}

export = new User();
