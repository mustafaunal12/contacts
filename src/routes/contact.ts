/* eslint-disable consistent-return */
import express, { Request, Response, NextFunction } from "express";
import required from "../decorators/argumentRequired";
import SaveContactRequest from "../dto/saveContactRequest";
import ContactService from "../services/contact";

const router = express.Router();

const service = new ContactService();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		required("name", "surname", "company", "phoneNumbers")(req.body);

		const requestDto = new SaveContactRequest(req.body);
		const response = await service.save(requestDto);
		res.send(response);
		next();
	} catch (err) {
		return next(err);
	}
});

export default router;
