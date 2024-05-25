const express = require('express');
const {Letter} = require('../models');      // index.js는 require 시 이름 생략 가능 
const { Op } = require('sequelize');

const router = express.Router();

// 이미지 조회
router.get('image_paths/:id', async (req, res) => {
    try {
        // id 파라미터 추출
        const { id } = req.params

        // id에 해당하는 letter 모델 레코드 조회
        const letter = await Letter.findOne({
            where: { id },
            include: [{
                association: 'image_paths', // 이미지 경로 필드명 확인
                attribute: ['imagePath'],   // 이미지 경로만 조회
            }],
        });

        if (!letter) {
            return res.status(404).json({ message: "해당 id의 이미지를 찾을 수 없습니다."})
        }

        const imagePath = letter.image_paths[0].imagePath
        
        // 이미지 경로 반환
        return res.status(200).json({ imagePath });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "이미지 불러오기 실패" })
    }
})

// 이미지 저장
router.post('image_paths/:id', async (req,res) => {
    try {
        const {id} = req.params;
        // const img = req.body.이미지경로가 저장된 곳;
        // titles 저장할 때의 id와 같은지 확인하고 이미지 경로 저장

        return res.status(200).json({"message":"이미지 저장 성공"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({"message":"서버 오류로 이미지 저장 실패"});
    }
})

// 이미지 수정
router.put('image_paths/:id', async (req,res) => {
    try {
        const {id} = req.params;
        // 이미지 저장할 때의 id와 같은지 확인하고 이미지 경로 수정
        // if(id === )
        
    }
    catch(error) {
        return res.status(500).json({"message":"서버 오류로 이미지 수정 실패"});
    }

})

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    