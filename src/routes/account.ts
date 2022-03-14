/* eslint-disable consistent-return */
import express, { Request, Response, NextFunction } from "express";
import required from "../decorators/argumentRequired";
import AccountService from "../services/account";

const router = express.Router();

const service = new AccountService();

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
	try {
		required("username", "password")(req.body);
		const { username, password } = req.body;
		const response = await service.login(username, password, process.env.TOKEN_SECRET);
		res.send(response);
		next();
	} catch (err) {
		return next(err);
	}
});

export default router;
