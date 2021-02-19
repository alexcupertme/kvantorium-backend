import User from "../DatabaseHandler";
import RegisterValidator from "../Methods/Validators/RegisterValidator";

export default class RegisterHandler {
  private clientData;

  /**
   * Registers a new user
   */
  public register(callback) {
    console.log(this.clientData);
    let registerValidator = new RegisterValidator();
    registerValidator.login = this.clientData.login;
    registerValidator.mail = this.clientData.mail;
    registerValidator.password = this.clientData.password;
    registerValidator.validate(registerValidator, (errors) => {
      if (errors)
        return callback(0, `ERR_INCORRECT_${errors[0].toUpper}`, null);
      else return callback(1, "SUCCESS", null);
    });
  }

  constructor(clientData) {
    this.clientData = clientData.body;
  }
}
