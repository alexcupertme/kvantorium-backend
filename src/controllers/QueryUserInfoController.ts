import User from "../models/DatabaseHandler";
import QueryUserInfoModel from "../models/RouteModels/QueryUserInfoModel";

class QueryUserInfoController {
  constructor() {}

  defaultMethod(clientRequest, callback) {
    let getUser = new QueryUserInfoModel(clientRequest);
    getUser.queryUserInfo((status, exitCode, data) => {
      return callback({ status, exitCode, data });
    });
  }
}

export = new QueryUserInfoController();
