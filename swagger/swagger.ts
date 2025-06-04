import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const options: swaggerJsdoc.Options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "하나 둘 셋! : 과거의 나에게",
			description:
				"과거의 자신을 오마주하여 사진을 찍고 편지를 작성하는 서비스",
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3000}`,
			},
		],
	},
	apis: ["./routes/*.ts"], // TypeScript 파일 경로로 수정
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
