import express from "express";
import authentication from "./middleware/authentication";
import logger from "./middleware/logger";
import home from "./routes/home";
import sequelize from "./data/database";

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(authentication);

app.use("/", home);

// Logs all requests
app.use(logger);

app.listen(process.env.SERVER_PORT, async () => {
	console.log("Listening on port ", process.env.SERVER_PORT);

	sequelize.authenticate().then(async () => {
		console.log("Connection has been established successfully.");
		try {
			await sequelize.sync({ force: true });
		} catch (error) {
			console.log("Unable to connect to the database:", error);
		}
	});
});

app.on("uncaughtException", (err: any) => {
	console.log(err);
});
