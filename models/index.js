const sequelize = require('../config/config')   // DB 설정을 불러옴

const letter = require('./letters')(sequelize);

module.exports = {
  sequelize,
  letter
}