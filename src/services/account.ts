import jwt from "jsonwebtoken";
import { ErrorResult, Result, SuccessResult } from "../objects/result";
import BaseService from "./baseService";
import User from "../data/models/user";
import ErrorCodes from "../objects/errorCodes";

export default class AccountService extends BaseService {
	public async login(username: string, password: string, secret: string): Promise<Result<any>> {
		const user = await User.findOne({ where: { userName: username, password }, raw: true });
		if (!user) {
			return new ErrorResult(ErrorCodes.LOGIN_CREDENTIAL_ERROR);
		}

		const accessToken = jwt.sign(user, secret);

		await User.update({ accessToken, updatedAt: new Date() }, { where: { id: user.id } });

		return new SuccessResult(accessToken);
	}
}
