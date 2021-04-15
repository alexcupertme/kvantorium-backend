import { NextFunction, Request, Response } from "express";

function errorMiddleware(request: Request, response: Response, next: NextFunction) {
	response.setHeader("Access-Control-Allow-Origin", " *");
	response.setHeader("Access-Control-Allow-Headers", " *");
	response.setHeader("Access-Control-Expose-Headers", " *");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	next();
}

export default errorMiddleware;
