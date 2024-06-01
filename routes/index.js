const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();

// 처음 화면 시작
router.get('/', (req, res) => {
  res.render('index');
});

// index.ejs에서 story로 이동
router.get('/story', (req, res) =>{
  res.render('story');
})

// story에서 letter으로 이동
router.get('/letter', (req, res) =>{
  res.render('letter');
})

// letter에서 shot으로 이동
router.get('/shot', (req, res) =>{
  res.render('shot');
})

// shot에서 design으로 이동
router.get('/design', (req, res) =>{
  res.render('design');
})

// design에서 write으로 이동
router.get('/write', (req, res) =>{
  res.render('write');
})

// choose에서 yes/no -> /post, /notpost으로 이동
router.post('/choose', (req, res) => {
    try {
        const {public} = req.body;
    
        if(public === 'yes') {
            res.render('post');
        }
        else if(public === 'no'){
            res.render('notpost');
        }
        else {
            console.log(err);
            return res.status(400).json({"message":"렌더링 실패 올바른 값이 아님"})
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({"message":"서버오류로 렌더링 실패"})
    }

})

// /post, /notpost으로 이동 3초 후 index으로 이동
router.get(['/post', '/notpost'], (req, res) => {
    setTimeout(function() {
        res.render('index');
    }, 3000);
});

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    