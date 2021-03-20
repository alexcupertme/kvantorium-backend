import { Request } from "express";

interface RequestWithUser extends Request {
	user;
}

export default RequestWithUser;
