const express = require('express');
const router = express.Router();
const {Letter} = require('../models/letters');

// 예시 코드
router.get("/photos/:id", (req,res) => {
    res.send("OK!");
})

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    