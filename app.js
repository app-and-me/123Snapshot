const express = require('express');
const app = express();
const port = 3000;

// routes 만든 라우터 불러오기
const mainRouter = require('../123Snapshot/routes/mainRouter');

// router
app.use('/', mainRouter);

// 서버 실행
app.listen(port, () => {
    console.log(`${port}에서 서버 실행`);
})
