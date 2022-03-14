import { ErrorResult, Result, SuccessResult } from "../objects/result";
import BaseService from "./baseService";
import ErrorCodes from "../objects/errorCodes";
import SaveContactRequest from "../dto/saveContactRequest";
import Contact from "../data/models/contact";
import Phone from "../data/models/phone";

export default class ContactService extends BaseService {
	public async save(request: SaveContactRequest): Promise<Result<any>> {
		if (request.phoneNumbers.length === 0) {
			return new ErrorResult(ErrorCodes.MISSING_PARAMETERS);
		}

		const {
			name, surname, company, phoneNumbers, user,
		} = request;

		const contact = await this.saveContact(name, surname, company, user.id);

		await this.savePhoneNumbers(contact.id, phoneNumbers);

		return new SuccessResult();
	}

	private async saveContact(name: string, surname: string, company: string, userId: number) {
		const contactDomain = new Contact({
			name, surname, company, userId,
		});

		const contact = await contactDomain.save();

		return contact;
	}

	private async savePhoneNumbers(contactId: number, phones: string[]) {
		await Promise.all(phones.map(async (number: string) => {
			const phoneNumber = new Phone({ contactId, number });
			await phoneNumber.save();
		}));
	}
}
