import { IsEmail, Length, Matches, IsOptional } from "class-validator";
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

class GetQueryUserInfoDto {
	@Length(3, 50)
	@Expose()
	@IsOptional()
	login: string;

	@IsOptional()
	@Expose()
	name: string;

	@IsOptional()
	@Expose()
	skills: Array<Object | string | number>;

	@IsOptional()
	@Expose()
	achievements: Array<Object | string | number>;

	@IsOptional()
	@Expose()
	kvantums: Array<Object | string | number>;

	@IsOptional()
	@Expose()
	@Length(1, 5000)
	description: string;

	@IsOptional()
	@Length(1, 50)
	@Expose()
	role: string;
}

export { RegisterDto, LoginDto, GetQueryUserInfoDto };
