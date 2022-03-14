import express from "express";
import authentication from "./middleware/authentication";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import sequelize from "./data/database";
import home from "./routes/home";
import account from "./routes/account";
import contact from "./routes/contact";

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(authentication);

app.use("/", home);
app.use("/account", account);
app.use("/contact", contact);

// Logs all requests
app.use(logger);

app.use(errorHandler);

app.listen(process.env.SERVER_PORT, async () => {
	console.log("Listening on port ", process.env.SERVER_PORT);

	sequelize.authenticate().then(async () => {
		console.log("Connection has been established successfully.");
		try {
			await sequelize.sync();
		} catch (error) {
			console.log("Unable to connect to the database:", error);
		}
	});
});
