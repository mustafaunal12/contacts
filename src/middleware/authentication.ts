/* eslint-disable consistent-return */
import { Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

const publicPaths = [
	"/",
	"/login",
	"/logout",
];

const isPublicPath = (path: string) => publicPaths.includes(path);

const authentication = async (req: any, res: Response, next: NextFunction) => {
	const body: any = req.body || {};

	if (isPublicPath(req.path)) {
		req.body = body;
		return next();
	}

	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
		console.log(err);

		if (err) return res.sendStatus(403);

		body.user = user;

		req.body = body;

		next();
	});
};

export default authentication;
