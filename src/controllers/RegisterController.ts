import RegisterModel from "../models/RouteModels/RegisterModel";

class RegisterController {
  constructor() {}

  defaultMethod(clientRequest, callback) {
    let regModel = new RegisterModel(clientRequest);
    regModel.register((status, exitCode, data) => {
      return callback({ status, exitCode, data });
    });
  }
}

export = new RegisterController();
