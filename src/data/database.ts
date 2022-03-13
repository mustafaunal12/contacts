import { Sequelize } from "sequelize-typescript";

require("dotenv").config();

// import Contact from "./models/contact";
// import User from "./models/user";
// import Phone from "./models/phone";

const sequelize = new Sequelize({
	database: process.env.DB_HOST,
	dialect: "mysql",
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	models: [`${__dirname}/models`],
});

export default sequelize;
