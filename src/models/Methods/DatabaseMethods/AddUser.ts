import UserSchema from "../../Interfaces/UserSchema";
import UserInterface from "../../Interfaces/UserInterface";
import genHash from "../bcrypt/GenerateHash";
import RegisterValidator from "../Validators/RegisterValidator";

export = function addUser(data, callback) {
  let date = new Date();
  let params: UserInterface = {
    mail: data.mail,
    login: data.login,
    password: data.password,
    registerDate: date,
    role: "user",
  };
  let valid = new RegisterValidator();
  valid.validate(valid, (error) => {
    if (error) {
      return callback(null, error);
    } else {
      let user: any = new UserSchema(params);
      genHash(user.password, (err, hash) => {
        if (err) return callback(err);
        user.password = hash;
        user.save(callback);
      });
    }
  });
};
