/* eslint-disable consistent-return */
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../data/models/user";

const publicPaths = [
	"/",
	"/account/login",
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

	jwt.verify(token, process.env.TOKEN_SECRET as string, async (err: any, user: any) => {
		console.log(err);

		if (err) {
			return res.sendStatus(401);
		}

		const isExist = await User.findOne({ where: { accessToken: token } });
		if (!isExist) {
			return res.sendStatus(401);
		}

		body.user = user;

		req.body = body;

		next();
	});
};

export default authentication;
