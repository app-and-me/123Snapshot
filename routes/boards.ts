import express from "express";
import { Letter } from "../models";
import { Op } from "sequelize";

const router = express.Router();

// 게시판 페이지에 사진, 글 각각 세 개씩 보여주는 get 메소드
router.get("/boards", async (req: any, res: any) => {
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

		// 총 사진 및 글 개수 가져오기
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

		if (endIndex < imageTotalCount) {
			results.next = {
				page: page + 1,
				perPage: perPage,
			};
		}
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				perPage: perPage,
			};
		}

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


router.post("/choose/:id", async (req: any, res: any) => {
	try {
		const { yn } = req.body;
		const { userId } = req.params;

		const answer = yn === "yes";

		const [updated] = await Letter.update(
			{ yn: answer },
			{ where: { userId: userId } }
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
