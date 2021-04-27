import { NextFunction, Request, Response } from "express";
import HttpException from "../models/HttpException";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const status = 200;
	const data = error.data || 0;
	const type = "error";
	const message = error.message || "Something went wrong";
	response.status(status).send({ type, data, status, message });
}

export default errorMiddleware;
