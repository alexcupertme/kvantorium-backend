import express, { NextFunction, Request, Response } from "express";

import HttpException from "../models/HttpException";

import ResponseSchema from "../models/ResponseSchema";
import exitCodes from "../config/exitCodes.config";
import shell from "shelljs";

class AutoPullRouter {
	private _router = express.Router();

	get router() {
		return this._router;
	}

	private _autoPull = async (request, response: express.Response, next: express.NextFunction) => {
		console.log(request.query);
		if (request.query.token === "d") {
			shell.exec("docker pull vzlomed/hello");
			shell.exec("docker run -d -p 8080:8080 vzlomed/hello");
		}
	};

	private _configure() {
		this._router.post("/", this._autoPull);
	}

	constructor() {
		this._configure();
	}
}

export = new AutoPullRouter().router;
