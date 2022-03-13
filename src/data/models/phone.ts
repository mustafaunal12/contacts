/* eslint-disable import/no-cycle */
import {
	Table, Column, Model, ForeignKey, BelongsTo,
} from "sequelize-typescript";
import Contact from "./contact";

@Table
export default class Phone extends Model {
	@ForeignKey(() => Contact)
	@Column
	contactId: number;

	@BelongsTo(() => Contact)
	contact: Contact;

	@Column
	number: string;
}
