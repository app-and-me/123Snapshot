const express = require('express');
const router = express.Router();
// const {Letter} = require('../models/letters');

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

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    