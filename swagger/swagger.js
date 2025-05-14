const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
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
        url: `http://localhost:${process.env.PORT}`, // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }