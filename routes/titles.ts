import express from "express";
import { Letter } from "../models";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Letters
 *     description: Letters 관련 API
 */
router.post("/:userId", async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
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
