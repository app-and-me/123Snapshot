const express = require('express');
const { Letter } = require("../models");
const router = express.Router();
const { Op } = require('sequelize');

// 게시판 페이지에 사진, 글 각각 세 개씩 보여주는 get 메소드
router.get('/board', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // 요청된 페이지. 기본값은 1
      const perPage = 3; // 페이지당 항목 수

      // 시작 인덱스 계산
      const startIndex = (page - 1) * perPage;

      // 공개된 사진 및 title만 검색
      const [imagePaths, titles] = await Promise.all([
        Letter.findAll({ 
          where: { yn: 1 },
          attributes: ['image_paths'],
          offset: startIndex, 
          limit: perPage }),
        Letter.findAll({ 
          where: { yn: 1 },
          attributes: ['titles'],
          offset: startIndex, 
          limit: perPage }),
      ]);

      // 공개된 항목 총 사진 및 글 개수 가져오기
      const [imageTotalCount, titleTotalCount] = await Promise.all([
        Letter.count({ where: { yn: 1, image_paths: { [Op.not]: null } }}),
        Letter.count({ where: { yn: 1, titles: { [Op.not]: null } }}),
      ]);

      // 결과 객체 준비
      const results = {};

      // 페이징 링크 추가 (필요한 경우)
      const endIndex = page * perPage;

      if (endIndex < imageTotalCount) {
        results.next = {
          page: page + 1,
          perPage: perPage
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          perPage: perPage
        };
      }

      if (imagePaths.length > 0 || titles.length > 0) {
        return res.status(200).json({ message: "페이징된 사진 및 글 목록 불러오기 성공", imagePaths, titles, pagination: results });
      } else {
        return res.status(400).json({ message: "페이징된 사진 및 글 목록 불러오기 실패" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "페이징된 사진 및 글 목록 불러오기 실패" });
    }
  });

// app.js에서 사용할 수 있도록 내보냄
module.exports = router;