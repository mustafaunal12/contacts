export default class ContactResponse {
	public id: number;

	public name: string;

	public surname: string;

	public company: string;

	public phones: string[];

	constructor(data: any) {
		this.id = data.id;
		this.name = data.name;
		this.surname = data.surname;
		this.company = data.company;
		this.phones = data.numbers.length > 0 ? data.numbers.map((number: any) => number.number) : [];
	}
}
