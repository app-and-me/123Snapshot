const { DataTypes } = require('sequelize');

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
    yn: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
})
 
module.exports = Letter;
  