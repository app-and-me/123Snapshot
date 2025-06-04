const express = require('express');
const {Letter} = require('../models');
const fs = require('fs');

const router = express.Router();

/*
router.get('/newUserId', async (req, res) => {
  localStorage.setItem("userId", user.id);
  res.json({ userId: user.id });   // 사용자 ID를 프론트로 보내기
});

// 사용자 id 조회, 프론트로 전달
router.get('/getUserId', (req, res) => {
  const currentUserId = localStorage.getItem("userId");
  res.json({ userId: currentUserId });
})


// 처음 화면 시작
router.get('/', (req, res) => {
  res.render('index');
});

// index.ejs에서 story로 이동
router.get('/story', (req, res) => {
  res.render('story');
});

// story에서 letter으로 이동
router.get('/letter', (req, res) => {
  res.render('letter');
})

// letter에서 shot으로 이동
router.get('/shot', (req, res) => {
  res.render('shot');
})

// shot에서 design으로 이동
router.get('/design', (req, res) => {
  res.render('design');
})

// design에서 write으로 이동
router.get('/write', (req, res) => {
  res.render('write');
})

router.get('/choose', (req, res) => {
  res.render('choose')
})

router.get('/print', (req, res) => {
  res.render('print');
})

router.get('/post', (req, res) => {
  res.render('post');
});


router.get('/notpost', (req, res) => {
  res.render('notpost');
});


router.get('/board', (req, res) => {
  res.render('board');
});
*/

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;