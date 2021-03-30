import express, { NextFunction, Request, Response } from "express";
import HttpException from "../models/HttpException";

export = function unknownRoute(request: Request, response: Response, next: NextFunction) {
	next(new HttpException(0, 0, "This method does not exists!"));
};
