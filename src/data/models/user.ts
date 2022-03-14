/* eslint-disable import/no-cycle */
import {
	Table, Column, Model, HasMany, DataType, Index,
} from "sequelize-typescript";
import Contact from "./contact";

@Table
export default class User extends Model {
	@Index("user_index")
	@Column
	userName: string;

	@Index("user_index")
	@Column
	password: string;

	@Index
	@Column(DataType.STRING(700))
	accessToken: string;

	@HasMany(() => Contact)
	contacts: Contact[];
}
