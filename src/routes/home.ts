/* eslint-disable consistent-return */
import express, { Request, Response, NextFunction } from "express";
import HomeService from "../services/home";

const router = express.Router();

const service = new HomeService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await service.get();
		res.send(response);
		next();
	} catch (err) {
		return next(err);
	}
});

export default router;
