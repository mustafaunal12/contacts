import { Sequelize } from "sequelize-typescript";

require("dotenv").config();

const sequelize = new Sequelize({
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	dialect: "mysql",
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	models: [`${__dirname}/models`],
});

export default sequelize;
