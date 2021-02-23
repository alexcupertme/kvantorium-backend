import AuthModel from "../models/RouteModels/AuthModel";

class AuthController {
  constructor() {}

  defaultMethod(clientRequest, callback) {
    let authModel = new AuthModel(clientRequest);
    authModel.auth((status, exitCode, data) => {
      return callback({ status, exitCode, data });
    });
  }
}

export = new AuthController();
