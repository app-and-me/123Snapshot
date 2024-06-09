const express = require('express');
const {Letter} = require('../models');
const { Op } = require('sequelize');
// const qs = require('querystring');

const router = express.Router();

let currentUserId = 0;    // 현재 사용자 id 

 

// 새로운 사용자 id 생성, 프론트로 전달
router.get('/newUserId', (req, res) => {
  currentUserId += 1;   // 사용자 ID 증가
  res.json({ userId: currentUserId });   // 사용자 id 프론트로 보내기
});

// 사용자 id 조회, 프론트로 전달
router.get('/getUserId', (req, res) => {
  res.json({ userId: currentUserId });
})

// 사용자 id값 DB에 저장
router.post('/saveUserId', async (req, res) => {
  try {
      const userId = req.body.userId;

      const user = await Letter.create({
          userId: userId
      });

      if (user) {
          res.status(200).json({ message : "사용자 ID 저장 성공" });
      } else {
          res.status(500).json({ message : "사용자 ID 저장 실패" });
      }
  }
  catch (error) {
      console.log(error);
      res.status(500).json({ message : "서버 오류로 사용자 ID 저장 실패" });
  }
});

// 처음 화면 시작
router.get('/', (req, res) => {
  res.render('index');
});

// index.ejs에서 story로 이동
router.get('/story', (req, res) => {
  res.render('story');
});

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

router.get('/choose', (req, res)=>{
  res.render('choose')
})


router.get('/post', (req, res) => {
  res.render('post');
});


router.get('/notpost', (req, res) => {
  res.render('notpost');
});


router.post('/choose/:userId', async (req, res) => { 
    try {
        const { yn } = req.body;

        if(yn == 'yes') {
          answer = true;
        }
        else {
          answer = false;
        }

        const [updated] = await Letter.update(
          { yn : answer },
          { where : { userId : userId } }
        )

        if(updated) {
            return res.status(400).json({ message : "게시여부 저장 성공" })
        }
        else {
            console.log(err);
            return res.status(400).json({ message : "게시여부 저장 실패" })
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ message : "서버오류로 게시여부 저장 실패" })
    }

})


router.get('/board', (req, res) => {
  res.render('board');
});

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    