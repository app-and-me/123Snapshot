import sequelize from "../config/config";
import LetterFactory from "./letter";

const Letter = LetterFactory(sequelize);

export { sequelize, Letter };
