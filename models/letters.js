const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Letter = (sequelize) => sequelize.define('letters', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
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
      indexes : [
        {
          unique: true,
          fields: ['id', 'userId']
        }
      ]
  });
 
module.exports = Letter;
  