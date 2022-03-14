import ContactResponse from "./contactResponse";

export default class ListContactResponse {
	constructor(public contacts: ContactResponse[], public nextPage: number) {

	}
}
