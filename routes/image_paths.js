const express = require('express');
const {Letter} = require('../models');      // index.js는 require 시 이름 생략 가능 
const { Op } = require('sequelize');

const router = express.Router();

// 예시 코드
router.get('image_paths/:id', async (req, res) => {
    try {
        var img = req.params.image_paths;
        console.log('이미지 요청: ' + img);
        res.sendFile('../public/images' + img);
    } catch (error) {
        console.error('Error');
    }
})

// 예시 코드
// router.get("/letters/:id", (req,res) => {
//     res.send("OK!");
// })

// router.post('/titles/:id', async (req,res) => {
    
//     try {
//         const {} = await req.body;
//     }
    
//     let body = "";

//     // 데이터 확인
//     req.on("data", (data) => {
//         body += data;
//     })

//     // DB에 데이터 추가
    

// })

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    