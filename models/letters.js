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
	tableName: 'letters',
	timestamps: false
});

module.exports = Users;