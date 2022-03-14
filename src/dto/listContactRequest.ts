import BaseRequest from "./baseRequest";

export default class ListContactRequest extends BaseRequest {
	public pageSize: number;

	public nextPage: number;

	constructor(data: any) {
		super(data.user);

		this.pageSize = data.pageSize || 10;
		this.nextPage = data.nextPage || 1;
	}
}
