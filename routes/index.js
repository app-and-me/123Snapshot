const express = require('express');
const { Op } = require('sequelize');

const router = express.Router();

// // 처음 화면 시작
// router.get('/', (req, res) => {
//   res.render('index');
// });

// // index.ejs에서 story로 이동
// router.get('/story', (req, res) =>{
//   res.render('story');
// })

// // letter에서 shot으로 이동
// router.get('/letter', (req, res) =>{
//   res.render('shot');
// })

// // shot에서 design으로 이동
// router.get('/shot', (req, res) =>{
//   res.render('design');
// })

// // design에서 write으로 이동
// router.get('/design', (req, res) =>{
//   res.render('write');
// })

// // write에서 choose을 이동
// router.get('/write', (req, res) =>{
//   res.render('choose');
// })

// // choose에서 yes -> (index)post setimeout 안에서 이동


// // 아니면 notpost -> (index)setimeout 안에서 이동


// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    