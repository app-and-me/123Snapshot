const express = require('express');
const router = express.Router();
const { Letter } = require('../models');
// table 정의되면 여기도 불러와야함

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