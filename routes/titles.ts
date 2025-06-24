import express from "express";
import { Letter } from "../models";

const router = express.Router();

/**
 * @swagger

 * /api/letter/{id}:
 *   patch:
 *     summary: 편지 메시지 수정
 *     tags:
 *       - Letter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 Letter의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: 수정할 메시지 내용
 *     responses:
 *       200:
 *         description: 메시지 저장 성공
 *       500:
 *         description: 저장 실패 또는 서버 오류
 */
router.patch("/:id", async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { message } = req.body;

		const [updated] = await Letter.update(
			{ titles: message },
			{ where: { id } }
		);

		if (updated) {
			return res.status(200).json({ message: "메세지 저장 성공" });
		} else {
			return res.status(500).json({ message: "메세지 저장 실패" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "서버오류로 메세지 저장 실패" });
	}
});

export default router;
