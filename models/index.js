// module export
// const로 상수 선언 
const sequelize = require('../config/config')
const router = express.Router();
app.use(express.static('public'));

const letter = require('./letters')(sequelize);

module.exports = {
  // imagePathRouter,
  // titlesRouter,
  letter
}