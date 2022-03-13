/* eslint-disable import/no-cycle */
import {
	Table, Column, Model, HasMany,
} from "sequelize-typescript";
import Contact from "./contact";

@Table
export default class User extends Model {
	@Column
	name: string;

	@Column
	password: string;

	@Column
	accessToken: string;

	@HasMany(() => Contact)
	contacts: Contact[];
}
