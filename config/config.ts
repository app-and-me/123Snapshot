import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE || "",
	process.env.MYSQL_USERNAME || "",
	process.env.MYSQL_PASSWORD || "",
	{
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT) || 3306,
		dialect: "mysql",
		logging: false,
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err: unknown) => {
		console.error("Unable to connect to the database:", err);
	});

export default sequelize;
