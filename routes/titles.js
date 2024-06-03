const express = require('express');
const {Letter} = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// 제목 저장
router.post("/:userId", async (req,res) => {
    try {
        const text = await Letter.create({
            userId : req.params.userId,
            titles : req.body.message
        });
        if(text) {
            res.render('views/choose.html');
            res.status(200).json({"message":"메세지 저장 성공"});
        }
        else {
            return res.status(500).json({"message":"메세지 저장 실패"});
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({"message":"서버오류로 메세지 저장 실패"});
    }
})


// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    