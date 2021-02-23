import { Length, IsOptional, validate } from "class-validator";

export default class Validator {
  constructor() {}

  token: string;

  @Length(3, 50)
  @IsOptional()
  login: string;

  @IsOptional()
  name: string;

  @IsOptional()
  skills: Array<Object | string | number>;

  @IsOptional()
  achievements: Array<Object | string | number>;

  @IsOptional()
  kvantums: Array<Object | string | number>;

  @IsOptional()
  @Length(1, 5000)
  description: string;

  @IsOptional()
  @Length(1, 50)
  role: string;

  public validate(token: Validator, callback) {
    validate(token).then((errors) => {
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
