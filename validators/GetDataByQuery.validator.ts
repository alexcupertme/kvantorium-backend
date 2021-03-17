import { IsString, Length, IsOptional } from "class-validator";

class GetDataByQueryDto {
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
}

export default GetDataByQueryDto;
