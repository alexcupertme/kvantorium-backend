class HttpException extends Error {
	status: number;
	data: Object;
	message: string;
	constructor(data: Object, status: number, message: string) {
		super(message);
		this.data = data;
		this.status = status;
		this.message = message;
	}
}

export default HttpException;
