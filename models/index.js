// module export
// const로 상수 선언 
const sequelize = require('../config/config')

// const User = require('./user')(sequelize);// sequelize가 db 정보를 가지고 있으므로 전달해주면 얘가 만들어봄 
// const Question = require('./question')(sequelize);// sequelize가 db 정보를 가지고 있으므로 전달해주면 얘가 만들어봄 
// const Company = require('./company')(sequelize);// sequelize가 db 정보를 가지고 있으므로 전달해주면 얘가 만들어봄 
// const Diary = require('./diary')(sequelize);// sequelize가 db 정보를 가지고 있으므로 전달해주면 얘가 만들어봄 
// const SelfTestResults = require('./self-test-result')(sequelize);// sequelize가 db 정보를 가지고 있으므로 전달해주면 얘가 만들어봄 

const imagePathRouter = require('./routes/image_paths')(sequelize);
//const titlesRouter = require('./routes/titles')(sequelize);
const lettersRouter = require('./routes/letters')(sequelize);

module.exports = {
  imagePathRouter,
  //titlesRouter,
  lettersRouter,
}