/* eslint-disable consistent-return */
import express, { Request, Response, NextFunction } from "express";
import required from "../decorators/argumentRequired";
import SaveContactRequest from "../dto/saveContactRequest";
import ContactService from "../services/contact";
import UpdateContactRequest from "../dto/updateContactRequest";
import ErrorCodes from "../objects/errorCodes";
import ListContactRequest from "../dto/listContactRequest";

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

router.put("/", async (req: Request, res: Response, next: NextFunction) => {
	try {
		required("id")(req.body);

		const requestDto = new UpdateContactRequest(req.body);
		const response = await service.update(requestDto);
		res.send(response);
		next();
	} catch (err) {
		return next(err);
	}
});

router.delete("/:contactId", async (req: Request, res: Response, next: NextFunction) => {
	try {
		required("contactId")(req.params);

		const contactId = parseInt(req.params.contactId);

		if (Number.isNaN(contactId)) {
			throw new Error(ErrorCodes.MISSING_PARAMETERS);
		}

		const response = await service.delete(req.body.user.id, contactId);
		res.send(response);
		next();
	} catch (err) {
		return next(err);
	}
});

router.post("/list", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const requestDto = new ListContactRequest(req.body);
		const response = await service.list(requestDto);
		res.send(response);
		next();
	} catch (err) {
		return next(err);
	}
});

export default router;
