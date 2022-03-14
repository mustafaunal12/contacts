import BaseRequest from "./baseRequest";

export default class SaveContactRequest extends BaseRequest {
	public name: string;

	public surname: string;

	public company: string;

	public phoneNumbers: string[];

	constructor(data: any) {
		super(data.user);

		this.name = data.name ? data.name.toLowerCase() : "";
		this.surname = data.surname ? data.surname.toLowerCase() : "";
		this.company = data.company ? data.company.toLowerCase() : "";
		this.phoneNumbers = data.phoneNumbers || [];
	}
}
