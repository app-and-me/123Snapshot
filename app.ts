import express from "express";
import cors from "cors";
import path from "path";
import { sequelize } from "./models";
import { swaggerUi, specs } from "./swagger/swagger";
import imagePathRouter from "./routes/image_paths";
import titlesRouter from "./routes/titles";
import boardsRouter from "./routes/boards";
import indexRouter from "./routes/index";

const app = express();

app.set("view engine", "ejs");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

sequelize
	.sync({ force: true })
	.then(() => console.log("Database synced"))
	.catch((err: any) => console.error("Error syncing database:", err));

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/usersPhotos", express.static(path.join(__dirname, "usersPhotos")));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.use("/image_paths", imagePathRouter);
app.use("/titles", titlesRouter);
app.use("/board", boardsRouter);
app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
	console.log(`${process.env.PORT}에서 서버 실행`);
});
