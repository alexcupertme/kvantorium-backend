import { keys } from "ts-transformer-keys";
import { classToClass, classToPlain, plainToClass } from "class-transformer";
import { isInstance, validate, ValidationError } from "class-validator";
import e, * as express from "express";
import exitCodes from "./config/exitCodes.config";
import HttpException from "./models/HttpException";

class MasterValidator {
	public validationMiddleware<T>(type: any): express.RequestHandler {
		return (req, res, next) => {
			let filteredData: Object = plainToClass(type, req.body, { excludeExtraneousValues: true });
			validate(filteredData).then((errors: ValidationError[]) => {
				if (errors.length > 0) {
					next(new HttpException(0, 200, `ERR_${errors[0].property.toUpperCase()}_INCORRECT`));
				} else {
					for (let key in filteredData) {
						if (filteredData[key] === undefined) {
							delete filteredData[key];
						}
					}
					req.body = filteredData;
					if (Object.keys(filteredData).length === 0) next(new HttpException(0, 200, exitCodes.emptyField));
					else next();
				}
			});
		};
	}
	public postValidationMiddleware<T>(type: any): express.RequestHandler {
		return (req, res, next) => {
			let blocks = req.body.blocks;
			if (blocks !== undefined && blocks instanceof Array && blocks.length !== 0) {
				blocks.forEach((block) => {
					if (!(block instanceof Object)) {
						next(new HttpException(0, 200, exitCodes.emptyField));
					} else {
						let filteredData: Object = plainToClass(type, block, { excludeExtraneousValues: true });
						validate(filteredData).then((errors: ValidationError[]) => {
							if (errors.length > 0) {
								next(new HttpException(0, 200, `ERR_${errors[0].property.toUpperCase()}_INCORRECT`));
							} else {
								for (let key in filteredData) {
									if (filteredData[key] === undefined) {
										delete filteredData[key];
									}
								}
								req.body = filteredData;
								console.log(filteredData);
								if (Object.keys(filteredData).length === 0) next(new HttpException(0, 200, exitCodes.emptyField));
								else next();
							}
						});
					}
				});
			} else next(new HttpException(0, 200, exitCodes.emptyField));
		};
	}
}

let masterValidator = new MasterValidator();
export default masterValidator;
