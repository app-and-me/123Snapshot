// 환경 변수 사용
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_DATABASE,
  {
    host: process.env.DB_HOST,
    prot: process.env.DB_PORT,
    dialect: "mysql"
  }
)

// 연결 테스트
sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to the config');
    })
    .catch((err) => {
        console.error('Unable to connect to the config:', err);
    });

module.exports = sequelize;