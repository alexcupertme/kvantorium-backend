import { NextFunction, Request, Response } from "express";

function errorMiddleware(request: Request, response: Response, next: NextFunction) {
	response.setHeader("Access-Control-Allow-Origin", "*");
	next();
}

export default errorMiddleware;
