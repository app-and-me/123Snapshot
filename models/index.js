// module export
// const로 상수 선언 
const sequelize = require('../config/config')

const letter = require('./letters')(sequelize);

module.exports = {
  sequelize,
  letter
}