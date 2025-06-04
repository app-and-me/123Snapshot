import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface LetterAttributes {
	id: number;
	image_paths?: string;
	titles?: string;
	yn?: boolean;
	userId?: number;
}

interface LetterCreationAttributes extends Optional<LetterAttributes, "id"> {}

export class Letter
	extends Model<LetterAttributes, LetterCreationAttributes>
	implements LetterAttributes
{
	public id!: number;
	public image_paths?: string;
	public titles?: string;
	public yn?: boolean;
	public userId?: number;
}

export default (sequelize: Sequelize) => {
	Letter.init(
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			image_paths: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			titles: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			yn: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "letters",
			timestamps: false,
			indexes: [
				{
					unique: true,
					fields: ["id"],
				},
			],
		}
	);
	return Letter;
};
