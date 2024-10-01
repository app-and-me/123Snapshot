const express = require('express');
const session = require('express-session');
const cors = require('cors');
const sequelize = require("./config/config");
const path = require('path');
const bodyParse = require('body-parser');

const app = express();
const port = 80;

// 템플릿 엔진으로 ejs 사용
app.set('view engine', 'ejs');

// routes 만든 라우터 불러오기
const imagePathRouter = require('./routes/image_paths');
const titlesRouter = require('./routes/titles');
const boardsRouter = require('./routes/boards');
const indexRouter = require('./routes/index');

// 서버 실행 시 테이블을 재생성 할 것 인지
// true이면 재생성 하겠다는 뜻
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced')
  })
  .catch((err) => {
    console.error('Error syncing database:', err)
  });

app.use(cors());

// 정적파일 제공 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use('/usersPhotos', express.static(path.join(__dirname, 'usersPhotos')));

// parser limit 조절
app.use(express.json({ limit : "50mb" }));
app.use(express.urlencoded({ limit:"50mb", extended: false }));

// app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(bodyParse.json())
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
  
// router
app.use('/image_paths', imagePathRouter);
app.use('/titles', titlesRouter);
app.use('/board', boardsRouter);
app.use('/', indexRouter);

// 서버 실행
app.listen(port, () => {
    console.log(`${port}에서 서버 실행`);
})