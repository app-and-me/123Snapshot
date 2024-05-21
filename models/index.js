// module export
// const로 상수 선언 
const sequelize = require('../config/config')

// const imagePathRouter = require('../routes/image_paths')(sequelize);
// const titlesRouter = require('../routes/titles')(sequelize);
const letter = require('./letters')(sequelize);

module.exports = {
  // imagePathRouter,
  // titlesRouter,
  letter
}