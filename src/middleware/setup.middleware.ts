import { NextFunction, Request, Response } from "express";

function errorMiddleware(request: Request, response: Response, next: NextFunction) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Headers", "Content-Type");
	response.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
}

export default errorMiddleware;
