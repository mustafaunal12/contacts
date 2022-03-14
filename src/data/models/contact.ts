/* eslint-disable import/no-cycle */
import {
	Table, Column, Model, ForeignKey, BelongsTo, HasMany, Index,
} from "sequelize-typescript";
import User from "./user";
import Phone from "./phone";

@Table
export default class Contact extends Model {
	@Column
	name: string;

	@Column
	surname: string;

	@Column
	company: string;

	@ForeignKey(() => User)
	@Column
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@HasMany(() => Phone)
	numbers: Phone[];

	@Index
	@Column({ type: "VARCHAR(500) GENERATED ALWAYS AS (CONCAT(name, surname, company)) STORED" })
	fulltext: string;
}
