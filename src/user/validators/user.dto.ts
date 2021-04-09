import { IsEmail, Length, Matches, IsOptional, MaxLength } from "class-validator";
import { Expose } from "class-transformer";

class LoginDto {
	@Expose()
	@Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
	password: string;

	@Expose()
	@Length(3, 50)
	login: string;
}

class RegisterDto {
	@Expose()
	@Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
	password: string;

	@IsEmail()
	@Expose()
	@Length(1, 50)
	mail: string;

	@Length(3, 50)
	@Expose()
	login: string;
}

class GetUserInfoDto {
	@Length(3, 50)
	@Expose()
	@IsOptional()
	login: string;

	@IsOptional()
	@MaxLength(30)
	@Expose()
	name: {
		firstName: string;
		secondName: string;
	};
	@IsOptional()
	@Expose()
	kvantums: [
		{
			kvantum: string;
			level: number;
		}
	];

	@IsOptional()
	@Expose()
	achievements: [{ name: string }];

	@IsOptional()
	@Expose()
	@Length(1, 5000)
	description: string;

	@IsOptional()
	@Length(1, 50)
	@Expose()
	role: string;

	@IsOptional()
	@Length(1, 50)
	@Expose()
	registerDate: number;
}

class ChangeMyInfoDto {
	@Length(3, 50)
	@Expose()
	@IsOptional()
	login: string;

	@IsOptional()
	@MaxLength(30)
	@Expose()
	name: string;

	@IsEmail()
	@Expose()
	@IsOptional()
	@Length(1, 50)
	mail: string;

	@IsOptional()
	@Expose()
	skills: Array<Object | string | number>;

	@IsOptional()
	@Expose()
	kvantums: Array<Object | string | number>;

	@IsOptional()
	@Expose()
	@Length(1, 5000)
	description: string;
}

class ChangePasswordDto {
	@Expose()
	@Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
	oldPassword: string;
	@Expose()
	@Matches("(?=^.{8,30}$)(?=.*[0-9])(?=.*\\" + "W)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$") //prettier-ignore // @ts-ignore
	password: string;
}

export { RegisterDto, LoginDto, GetUserInfoDto, ChangeMyInfoDto, ChangePasswordDto };
