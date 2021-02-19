import User from "../models/DatabaseHandler";
import RegisterModel from "../models/RouteModels/RegisterModel";

class RegisterController {
  constructor() {}

  defaultMethod(clientRequest, callback) {
    let register = new RegisterModel(clientRequest);
    register.register((status, exitCode, data) => {
      return callback({ status, exitCode, data });
    });
  }
}

export = new RegisterController();
