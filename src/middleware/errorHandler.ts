/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import ErrorCodes from "../objects/errorCodes";
import { ErrorResult } from "../objects/result";

const customizeArgumentRequiredError = (err: any) => `'${err.message.split(":")[1].trim()}' is required.`;

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err);
	let customError = new ErrorResult(ErrorCodes.UNKNOWN_ERROR);

	if (err.name === "ArgumentRequiredError") {
		customError = new ErrorResult(ErrorCodes.MISSING_PARAMETERS, customizeArgumentRequiredError(err));
	}

	res.send(customError);
};

export default errorHandler;
