import { Expose } from "class-transformer";
import { IsIn, IsInt, IsObject, IsOptional, IsUrl, Length, Max, Min } from "class-validator";

class PostDto {
	@Expose()
	@Length(1, 50)
	@IsIn(["video", "image", "text", "url", "separator"])
	type: string;

	@IsOptional()
	@Expose()
	@IsObject()
	data: Object;

	@IsOptional()
	@Expose()
	cover: string;

	@IsOptional()
	@Expose()
	anchor: string;
}

class PostTextDto {
	@Expose()
	@Length(1, 5000)
	text: string;
}

class PostImageDto {
	@Expose()
	@Length(1, 100)
	title: string;

	@Expose()
	@Length(1, 100)
	author: string;

	@Expose()
	@Length(1, 500)
	@IsUrl()
	src: URL;

	@Expose()
	@IsInt()
	@Min(100)
	@Max(4000)
	width: number;

	@Expose()
	@IsInt()
	@Min(100)
	@Max(4000)
	height: number;
}

class PostVideoDto {
	@Expose()
	@Length(1, 500)
	@IsUrl()
	src: URL;

	@Expose()
	@IsInt()
	@Min(100)
	@Max(4000)
	width: number;

	@Expose()
	@IsInt()
	@Min(100)
	@Max(4000)
	height: number;
}

class PostURLDto {
	@Expose()
	@Length(1, 500)
	@IsUrl()
	src: URL;
}

export { PostDto, PostTextDto, PostImageDto, PostVideoDto, PostURLDto };
