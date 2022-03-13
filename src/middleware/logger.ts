import { Response, NextFunction } from "express";

const logger = async (req: any, res: Response, next: NextFunction) => {
	console.log(JSON.stringify({
		path: req.route ? req.route.path : "unhandled route",
		headers: req.headers,
		body: req.body,
		params: req.params,
	}));
	next();
};

export default logger;
