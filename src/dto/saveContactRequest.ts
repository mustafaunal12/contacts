import BaseRequest from "./baseRequest";

export default class SaveContactRequest extends BaseRequest {
	public name: string;

	public surname: string;

	public company: string;

	public phoneNumbers: string[];

	constructor(data: any) {
		super(data.user);

		this.name = data.name;
		this.surname = data.surname;
		this.company = data.company;
		this.phoneNumbers = data.phoneNumbers || [];
	}
}
