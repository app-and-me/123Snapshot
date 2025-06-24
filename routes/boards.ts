import express from "express";
import { Letter } from "../models";
import { Op } from "sequelize";

const router = express.Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: 공개된 사진 및 글 목록 페이징 조회
 *     tags:
 *       - Letter
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 요청할 페이지 번호
 *     responses:
 *       200:
 *         description: 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 페이징된 사진 및 글 목록 불러오기 성공
 *                 letters:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       image_paths:
 *                         type: string
 *                         nullable: true
 *                       titles:
 *                         type: string
 *                         nullable: true
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     next:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         perPage:
 *                           type: integer
 *                     previous:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         perPage:
 *                           type: integer
 *       400:
 *         description: 데이터 없음
 *       500:
 *         description: 서버 오류
 */
// 게시판 페이지에 사진, 글 각각 세 개씩 보여주는 get 메소드
router.get("/", async (req: any, res: any) => {
	try {
		const page: number = parseInt(req.query.page as string) || 1;
		const perPage = 3;

		const startIndex = (page - 1) * perPage;

		// 공개된 사진 및 title만 검색, id 기준 내림차순 정렬
		const letters = await Letter.findAll({
			where: { yn: 1 },
			attributes: ["image_paths", "titles"],
			order: [["id", "DESC"]],
			offset: startIndex,
			limit: perPage,
		});

		// 전체 레터 중 사진이 있는 항목 개수, 제목이 있는 항목 개수 집계
		// image_paths가 null이 아닌 경우
		// titles가 null이 아닌 경우
		const [imageTotalCount, titleTotalCount] = await Promise.all([
			Letter.count({
				where: {
					yn: 1,
					image_paths: { [Op.ne]: null as unknown as string },
				},
			}),
			Letter.count({
				where: {
					yn: 1,
					titles: { [Op.ne]: null as unknown as string },
				},
			}),
		]);

		const results: any = {};
		const endIndex = page * perPage;

		// 다음 페이지가 존재하면 next 정보 추가
		if (endIndex < imageTotalCount) {
			results.next = {
				page: page + 1,
				perPage: perPage,
			};
		}

		// 이전 페이지가 존재하면 previous 정보 추가
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				perPage: perPage,
			};
		}

		// 데이터가 존재하면 성공 응답 반환
		if (letters.length > 0) {
			return res.status(200).json({
				message: "페이징된 사진 및 글 목록 불러오기 성공",
				letters,
				pagination: results,
			});
		} else {
			return res.status(400).json({
				message: "페이징된 사진 및 글 목록 불러오기 실패",
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "페이징된 사진 및 글 목록 불러오기 실패",
		});
	}
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: 특정 게시물 조회
 *     tags:
 *       - Letter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 Letter의 ID
 *     responses:
 *       200:
 *         description: 게시물 불러오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시물 불러오기 성공
 *                 photo:
 *                   type: object
 *                   example:
 *                     id: 1
 *                     titles: "예시 제목"
 *                     image_paths: "https://example.com/image.jpg"
 *                     yn: true
 *       404:
 *         description: 게시물이 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시물 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/:id", async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const photo = await Letter.findByPk(id);

		if (photo) {
			return res.status(200).json({
				message: "게시물 불러오기 성공",
				photo,
			});
		} else {
			return res.status(404).json({
				message: "게시물 없음",
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: "게시물 불러오기 실패",
		});
	}
});

/**
 * @swagger
 * /api/letter/{id}/publish:
 *   patch:
 *     summary: 게시 여부 저장
 *     tags:
 *       - Letter
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 게시 여부를 수정할 Letter의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               yn:
 *                 type: string
 *                 enum: [yes, no]
 *                 description: 게시 여부 ('yes'는 true, 나머지는 false)
 *     responses:
 *       200:
 *         description: 게시여부 저장 성공
 *       400:
 *         description: 게시여부 저장 실패
 *       500:
 *         description: 서버 오류
 */

router.patch("/:id/publish", async (req: any, res: any) => {
	try {
		const { yn } = req.body;
		const { id } = req.params;

		const answer = yn === "yes";

		const [updated] = await Letter.update(
			{ yn: answer },
			{ where: { id } }
		);

		if (updated > 0) {
			return res.status(200).json({ message: "게시여부 저장 성공" });
		} else {
			return res.status(400).json({ message: "게시여부 저장 실패" });
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "서버오류로 게시여부 저장 실패" });
	}
});

export default router;
