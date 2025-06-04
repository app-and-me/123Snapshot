import express, { Request, Response } from "express";
import { Letter } from "../models";
import path from "path";
import fs from "fs";
import bucket from "../firebase";

const router = express.Router();

router.get("/:userId", async (req: any, res: any) => {
	try {
		const { userId } = req.params;
		const letter = await Letter.findOne({ where: { userId } });
		if (!letter)
			return res
				.status(404)
				.json({ message: "해당 이미지를 찾을 수 없습니다." });
		res.status(200).json({ imagePath: letter.image_paths });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "이미지 불러오기 실패" });
	}
});

router.post("/photos", async (req: any, res: any) => {
	try {
		const { imageUrl } = req.body;
		const filename = `upload/${Date.now()}.jpg`;
		const matches = imageUrl.match(/^data:(.+);base64,(.+)$/);
		if (!matches) return res.status(400).send("잘못된 base64 형식");
		const buffer = Buffer.from(matches[2], "base64");
		const file = bucket.file(filename);
		const stream = file.createWriteStream({
			metadata: { contentType: "image/png" },
		});
		stream.on("error", (err) =>
			res.status(500).send("업로드 중 오류 발생")
		);
		stream.on("finish", async () => {
			const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
			await Letter.create({ image_paths: publicUrl });
			res.status(200).json({
				message: "이미지 저장 성공",
				imageUrl: publicUrl,
			});
		});
		stream.end(buffer);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "서버 오류로 이미지 저장 실패" });
	}
});

router.put("/:userId", async (req: any, res: any) => {
	try {
		const { userId } = req.params;
		const { newImageData } = req.body;
		const letter = await Letter.findOne({ where: { userId } });
		if (!letter)
			return res.status(404).json({ message: "수정할 이미지 찾기 실패" });
		const filename = `${userId}-${Date.now()}.jpg`;
		const filePath = path.join(__dirname, "../usersPhotos", filename);
		if (fs.existsSync(path.join(__dirname, "..", letter.image_paths || "")))
			fs.unlinkSync(path.join(__dirname, "..", letter.image_paths || ""));
		fs.writeFileSync(filePath, newImageData.split(";base64,").pop()!, {
			encoding: "base64",
		});
		await letter.update({ image_paths: `/usersPhotos/${filename}` });
		res.status(200).json({
			message: "이미지 수정 성공",
			updatedImagePath: filePath,
		});
	} catch (error) {
		res.status(500).json({ message: "서버 오류로 이미지 수정 실패" });
	}
});

export default router;
