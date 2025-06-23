import express from "express";
import { Letter } from "../models";
import bucket from "../firebase";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

interface UploadRequest extends Request {
  file: Express.Multer.File;
}

/**
 * @swagger
 * /api/image/upload:
 *   post:
 *     summary: 이미지를 업로드하고 Letter에 저장
 *     tags:
 *       - Letter
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               ImageName:
 *                 type: string
 *                 format: binary
 *                 description: 업로드할 이미지 파일
 *     responses:
 *       200:
 *         description: 업로드 및 저장 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   description: 저장된 Letter 객체
 *       400:
 *         description: 이미지가 없을 경우
 *       500:
 *         description: 서버 오류
 */
router.post(
  "/upload",
  upload.single("ImageName"),
  async (req: UploadRequest, res: any) => {
    if (!req.file) {
      return res.status(400).json({ message: "업로드된 이미지가 없습니다." });
    }

    try {
      // 확장자 추출
      const ext = path.extname(req.file.originalname);
      const filename = `upload/${Date.now()}_${uuidv4()}${ext}`;

      // firebase 관련 메타데이터 설정
      const metadata = {
        contentType: req.file.mimetype,
        cacheControl: "public, max-age=3600", // 1시간 캐싱
      };

      const file = bucket.file(filename);
      // 스트림으로 데이터를 Firebase에 전송
      const stream = file.createWriteStream({
        metadata,
        gzip: true,
      });

      stream.on("error", (err) => {
        console.error("Firebase 업로드 실패:", err);
        return res
          .status(500)
          .json({ message: "이미지 업로드 실패", error: err.message });
      });

      stream.on("finish", async () => {
        const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(file.name)}?alt=media`;

        const letter = await Letter.create({ image_paths: downloadUrl });

        return res.status(200).json({
          message: "이미지 업로드 성공",
          data: letter,
        });
      });

      stream.end(req.file.buffer);
    } catch (error: any) {
      console.error("서버 오류:", error);
      return res.status(500).json({ message: "서버 오류로 업로드 실패" });
    }
  }
);

export default router;
