const express = require('express');
const {Letter} = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

// 예시 코드
// router.get("/titles/:id", (req,res) => {
//     res.send("OK!");
// })



// app.js에서 사용할 수 있도록 내보냄
module.exports = router;    