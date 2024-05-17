const express = require('express');
const app = express();
const port = 3000;

// routes 만든 라우터 불러오기
const mainRouter = require('../123Snapshot/routes/mainRouter');

// router
app.use('/', mainRouter);

// 서버 실행
app.listen(port, () => {
    console.log(`${port}에서 서버 실행`);
})

// 모듈 가져와서 데이터베이스에 연결
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: process.env.DB_HOST,
	dialect: 'mysql'
});

// 모델 정의 
const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    image_paths: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    titles: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    letters: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
	// 실제 테이블 이름 
	tableName: 'snapshot',
	timestamps: false
});

// 데이터베이스 동기화 (실제 운영 환경에서 사용 X, 개발할때 확인용)
sequelize.sync()
  .then(() => {
    console.log('연결 성공');
  })
  .catch((error) => {
    console.error('연결 실패: ', error);
  });

module.exports = Users;