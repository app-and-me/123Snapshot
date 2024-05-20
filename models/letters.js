const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Letter = (sequelize) => sequelize.define('letters', {
    id: {
      type: DataTypes.BIGINT,
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
})
 
module.exports = Letter;
  