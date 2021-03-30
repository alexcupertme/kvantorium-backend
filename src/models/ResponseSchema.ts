class ResponseSchema {
	status: number;
	data: Object;
	action: string;
	message: string;
	constructor(action: string, data: Object, status: number, message: string) {
		this.action = action;
		this.data = data;
		this.status = status;
		this.message = message;
	}
}

export default ResponseSchema;
