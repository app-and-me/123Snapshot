const express = require('express');
const session = require('express-session');
const cors = require('cors');
const multer = require('multer');
const sequelize = require("./config/config");


const path = require('path');
const bodyParse = require('body-parser');

const app = express();
const port = 3000;

// 템플릿 엔진으로 ejs 사용
app.set('view engine', 'ejs');

// routes 만든 라우터 불러오기
const imagePathRouter = require('./routes/image_paths');
const titlesRouter = require('./routes/titles');
const broadsRouter = require('./routes/broads');

sequelize.sync()
  .then(() => {
    console.log('Database synced')
  })
  .catch((err) => {
    console.error('Error syncing database:', err)
  });

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(bodyParse.json())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
  

// router
app.use('/image_path', imagePathRouter);
app.use('/titles', titlesRouter);
app.use('/broads', broadsRouter);

// 서버 실행
app.listen(port, () => {
    console.log(`${port}에서 서버 실행`);
})

