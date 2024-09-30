const express = require('express');
const {Letter} = require('../models');      // index.js는 require 시 이름 생략 가능 
const { Op } = require('sequelize');
const path = require('path');   
const fs = require('fs');           // 파일 시스템 모듈 사용
const { createCanvas, loadImage  } = require('canvas');   // canvas 사용

const router = express.Router();

// 이미지 경로 조회
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // id에 해당하는 letter 모델 레코드 조회
        const letter = await Letter.findOne({
            where: { userId }
        });

        if (!letter) {
            return res.status(404).json({ message: "해당 이미지를 찾을 수 없습니다." });
        }

        const imagePath = letter.image_paths;

        // 이미지 경로 반환
        return res.status(200).json({ imagePath });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "이미지 불러오기 실패" });
    }
});

// 이미지 경로 저장
router.post('/:userId', async (req,res) => {
    try {
        const { userId } = req.params;
        const { imageUrl } = req.body;       // 프론트에서 받은 이미지 데이터

        // 파일 저장 경로 설정
        const filename = `${userId}-${Date.now()}.jpg`;
        const filePath = path.join(__dirname, '../usersPhotos', filename);

        // Base64 데이터를 파일로 저장
        fs.writeFileSync(filePath, imageUrl.split(';base64,').pop(), {encoding: 'base64'});

        const [updated] = await Letter.update(      
            { image_paths: `/usersPhotos/${filename}` },    // 접근할 수 있는 경로로 수정
            { where: { userId: userId } }
        );

        if(updated) {
            return res.status(200).json({message:"이미지 저장 성공"});
        }
        else {
            return res.status(404).json({message :"(업데이트) 저장할 곳을 찾을 수 없음"});
        }
        
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message:"서버 오류로 이미지 저장 실패"});
    }
});

// 이미지 경로 수정 후 색 이미지, 흑백 이미지로 저장
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
        const filePath = path.join(__dirname, '../usersPhotos', filename);           // 파일 경로 생성
        const grayscaleFilePath = path.join(__dirname, '../printPhotos', filename);  // 흑백 사진 경로 생성

        // 기존 파일 삭제
        if (fs.existsSync(path.join(__dirname, '..', letter.image_paths))) {    // 기존 파일이 존재하는지 확인
            fs.unlinkSync(path.join(__dirname, '..', letter.image_paths));      // 기존 파일을 삭제
        }

        // 새 이미지 데이터를 파일로 저장
        fs.writeFileSync(filePath, newImageData.split(';base64,').pop(), {encoding: 'base64'});

        // 흑백 변환 후, 폴더 경로에 저장
        const printImage = await transformColorImage(grayscaleFilePath)

        // 데이터베이스에 이미지 경로 업데이트
        await letter.update({ image_paths: `/usersPhotos/${filename}` });       //  // 접근할 수 있는 경로로 수정

        return res.status(200).json({message: "이미지 수정 성공", updatedImagePath: filePath});
    }
    catch(error) {
        return res.status(500).json({message:"서버 오류로 이미지 수정 실패"});
    }

})

async function transformColorImage(filePath) {
    const image = await loadImage(filePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const grayscale = r * 0.3 + g * 0.59 + b * 0.11;

        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
    }

    ctx.putImageData(imageData, 0, 0);

    // 흑백 이미지를 파일로 저장
    const grayscaleBuffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(filePath, grayscaleBuffer);
}

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    