const express = require('express');
const app = express();
const port = 3000;

// routes 만든 라우터 불러오기
const mainRouter = require('./routes/image_paths');
const mainRouter = require('./routes/titles');
const mainRouter = require('./routes/letters');

// router
app.use('/image_path', image_paths);
app.use('/titles', titles);
app.use('/lettes', letters);

// 서버 실행
app.listen(port, () => {
    console.log(`${port}에서 서버 실행`);
})