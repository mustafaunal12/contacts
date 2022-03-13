import { Result, SuccessResult } from "../objects/result";
import BaseService from "./baseService";

export default class HomeService extends BaseService {
	public async get(): Promise<Result<any>> {
		return new SuccessResult();
	}
}
