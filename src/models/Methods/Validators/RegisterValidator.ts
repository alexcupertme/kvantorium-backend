import { Matches, Length, IsEmail, validate } from "class-validator";

export default class Register {
  @Matches(/(?=^.{8,30}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @IsEmail()
  @Length(1, 50)
  mail: string;

  @Length(3, 50)
  login: string;

  public validate(register: Register, callback) {
    validate(register).then((errors) => {
      if (errors.length > 0) {
        let errorArr = [];
        errors.forEach((error) => {
          console.log(error.property);
          errorArr.push(error.property);
        });
        return callback(errorArr);
      } else {
        return callback();
      }
    });
  }
}
