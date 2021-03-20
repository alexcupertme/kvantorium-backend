import { keys } from "ts-transformer-keys";
import { classToClass, classToPlain, plainToClass } from "class-transformer";
import { isInstance, validate, ValidationError } from "class-validator";
import e, * as express from "express";
import HttpException from "../exceptions/HttpException";

class MasterValidator {
	public validationMiddleware<T>(type: any): express.RequestHandler {
		return (req, res, next) => {
			let filteredData = plainToClass(type, req.body, { excludeExtraneousValues: true });
			validate(filteredData).then((errors: ValidationError[]) => {
				if (errors.length > 0) {
					next(new HttpException(0, 400, `ERR_${errors[0].property.toUpperCase()}_INCORRECT`));
				} else {
					for (let key in filteredData) {
						if (filteredData[key] === undefined) {
							delete filteredData[key];
						}
					}
					req.body = filteredData;
					next();
				}
			});
		};
	}
}

let masterValidator = new MasterValidator();
export default masterValidator.validationMiddleware;
