import { ErrorResult, Result, SuccessResult } from "../objects/result";
import BaseService from "./baseService";
import ErrorCodes from "../objects/errorCodes";
import SaveContactRequest from "../dto/saveContactRequest";
import Contact from "../data/models/contact";
import Phone from "../data/models/phone";
import UpdateContactRequest from "../dto/updateContactRequest";
import ListContactRequest from "../dto/listContactRequest";
import ListContactResponse from "../dto/listContactResponse";
import ContactResponse from "../dto/contactResponse";

const { Op } = require("sequelize");

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

	public async update(request: UpdateContactRequest): Promise<Result<any>> {
		const {
			id, name, surname, company, phoneNumbers, user,
		} = request;

		const contact = await Contact.findOne({ where: { id, userId: user.id }, raw: true });
		if (!contact) {
			return new ErrorResult(ErrorCodes.CONTACT_NOT_FOUND);
		}

		await this.updateContact(id, name, surname, company);

		await this.updatePhoneNumbers(id, phoneNumbers);

		return new SuccessResult();
	}

	public async delete(userId: number, contactId: number): Promise<Result<any>> {
		const contact = await Contact.findOne({ where: { id: contactId, userId } });
		if (!contact) {
			return new ErrorResult(ErrorCodes.CONTACT_NOT_FOUND);
		}

		await contact.destroy();

		return new SuccessResult();
	}

	public async list(request: ListContactRequest): Promise<Result<ListContactResponse>> {
		const limit = request.pageSize + 1;
		const offset = (request.nextPage > 0 ? request.nextPage - 1 : 0) * request.pageSize;

		const contacts: any = await Contact.findAll({
			where: { userId: request.user.id },
			include: [{ model: Phone }],
			offset,
			limit,
			order: [["name", "ASC"]],
		});

		let nextPage = 1;
		if (request.nextPage) {
			nextPage = contacts.length > request.pageSize ? request.nextPage + 1 : 1;
		}
		if (contacts.length > request.pageSize) {
			contacts.pop();
		}

		const contactDtoList = contacts.map((contact: any) => new ContactResponse(contact.toJSON()));

		return new SuccessResult(new ListContactResponse(contactDtoList, nextPage));
	}

	public async search(userId: number, searchKey: string): Promise<Result<ContactResponse[]>> {
		if (!Number.isNaN(parseInt(searchKey))) {
			console.log("number");
		}

		const contacts: any = await Contact.findAll({
			where: {
				userId,
				[Op.or]: [
					{
						fulltext: {
							[Op.like]: `%${searchKey}%`,
						},
					},
					{
						"$numbers.number$": {
							[Op.like]: `%${searchKey}%`,
						},
					},
				],
			},
			include: [{ model: Phone }],
			order: [["name", "ASC"]],
		});

		const contactDtoList = contacts.map((contact: any) => new ContactResponse(contact.toJSON()));

		return new SuccessResult({ contacts: contactDtoList });
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

	private async updateContact(id: number, name: string, surname: string, company: string) {
		if (!name && surname && company) {
			return;
		}

		const contact = { name, surname, company };
		await Contact.update(contact, { where: { id } });
	}

	private async updatePhoneNumbers(id: number, phoneNumbers: string[]) {
		if (!phoneNumbers || phoneNumbers.length === 0) {
			return;
		}

		await Contact.destroy({ where: { id } });
		await this.savePhoneNumbers(id, phoneNumbers);
	}
}
