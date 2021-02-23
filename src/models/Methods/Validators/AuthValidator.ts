import { Matches, Length, validate } from "class-validator";

export default class Validator {
  @Matches(
    "(?=^.{8,30}$)(?=.*[0-9])(?=.*[!@#$%-^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
  )
  password: string;

  @Length(3, 50)
  login: string;

  public validate(auth: Validator, callback) {
    validate(auth).then((errors) => {
      if (errors.length > 0) {
        let errorArr = [];
        errors.forEach((error) => {
          errorArr.push(error.property);
        });
        return callback(errorArr);
      } else {
        return callback();
      }
    });
  }
}
