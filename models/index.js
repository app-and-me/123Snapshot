const sequelize = require('../config/config')   // DB 설정을 불러옴

const Letter = require('./letter')(sequelize);

module.exports = {
  sequelize,
  Letter
}