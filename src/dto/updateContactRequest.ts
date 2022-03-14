import SaveContactRequest from "./saveContactRequest";

export default class UpdateContactRequest extends SaveContactRequest {
	public id: number;

	constructor(data: any) {
		super(data);

		this.id = data.id;
	}
}
