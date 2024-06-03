const express = require('express');
const {Letter} = require('../models');      // index.js는 require 시 이름 생략 가능 
const { Op } = require('sequelize');
const path = require('path');   
const fs = require('fs');       // 파일 시스템 모듈 사용

const router = express.Router();

// 이미지 경로 조회
router.get('/:userId', async (req, res) => {
    try {
        // id 파라미터 추출
        const { userId } = req.params

        // id에 해당하는 letter 모델 레코드 조회
        const letter = await Letter.findOne({
            where: { userId },
            include: [{
                association: 'image_paths', // 이미지 경로 필드명 확인
                attribute: ['imagePath'],   // 이미지 경로만 조회
            }],
        });

        if (!letter) {
            return res.status(404).json({ message: "해당의 이미지를 찾을 수 없습니다."})
        }

        const imagePath = letter.image_paths[0].imagePath
        
        // 이미지 경로 반환
        return res.status(200).json({ imagePath });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "이미지 불러오기 실패" })
    }
})

// 이미지 경로 저장
router.post('/:userId', async (req,res) => {
    try {
        const { userId } = req.params;
        const { imageData } = req.body;       // 프론트에서 받은 이미지 데이터

        // 파일 저장 경로 설정
        const filename = `${userId}-${Date.now()}.jpg`;
        const filePath = path.join(__dirname, '../usersPhotos', filename);

        // Base64 데이터를 파일로 저장
        fs.writeFileSync(filePath, imageData.split(';base64,').pop(), {encoding: 'base64'});

        const Letter = await Letter.create({
            image_paths : filePath
        })

        return res.status(200).json({message:"이미지 저장 성공"});
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message:"서버 오류로 이미지 저장 실패"});
    }
})

// 이미지 경로 수정
router.put('/:userId', async (req,res) => {
    try {
        const { userId } = req.params;
        const { newImageData } = req.body;      // 수정할 이미지 데이터

        // 해당 userId로 이미지 경로 조회
        const letter = await Letter.findOne({ where: {userId} });

        if(!letter) {
            return res.status(404).json({message: "수정할 이미지 찾기 실패"});
        }

        // 파일 저장 경로 업데이트
        const filename = `${userId}-${Date.now()}.jpg`;     // 파일 이름 생성
        const filePath = path.join(__dirname, '../usersPhotos', filename);      // 파일 경로 생성

        // 기존 파일 삭제
        if (fs.existsSync(letter.image_paths)) {    // 기존 파일이 존재하는지 확인
            fs.unlinkSync(letter.image_paths);      // 기존 파일을 삭제
        }

        // 새 이미지 데이터를 파일로 저장
        fs.writeFileSync(filePath, newImageData.split(';base64,').pop(), {encoding: 'base64'});

        // 데이터베이스에 이미지 경로 업데이트
        await letter.update({ imagePath: filePath });

        return res.status(200).json({message: "이미지 수정 성공", updatedImagePath: filePath});
    }
    catch(error) {
        return res.status(500).json({message:"서버 오류로 이미지 수정 실패"});
    }

})

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    