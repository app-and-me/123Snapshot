const express = require('express');
const router = express.Router();

// 예시 코드
router.get("/", (req,res) => {
    res.send("OK!");
})

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    