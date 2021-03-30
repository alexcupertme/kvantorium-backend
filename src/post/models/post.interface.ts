export default interface Post {
	blocks: [
		{
			type: string;
			data: Object | undefined;
			cover: string | undefined;
			anchor: string | undefined;
		}
	];
}
