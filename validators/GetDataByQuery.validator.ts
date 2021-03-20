import { Expose } from "class-transformer";
import { IsString, Length, IsOptional } from "class-validator";

class GetDataByQueryDto {
	@Length(3, 50)
	@Expose()
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
	@Length(1, 5000)
	@Expose()
	description: string;

	@IsOptional()
	@Length(1, 50)
	@Expose()
	role: string;
}

export default GetDataByQueryDto;
