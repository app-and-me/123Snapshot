const { DataTypes } = require('sequelize');
// const sequelize = require('./index');

const Letter = (sequelize) => sequelize.define('letters', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,       // 기본 키로 설정
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
  yn: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
},
  {
    timestamps: false,    // 기본으로 생기는 column을 생기지 않게 함
    indexes: [
      {
        unique: true,
        fields: ['id']    // user별 고유성을 보장
      }
    ]
  });

module.exports = Letter;
