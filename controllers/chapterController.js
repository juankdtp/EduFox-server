const { Chapter } = require("../models/index");

class ChapterController {
  static async getChapterById(req, res, next) {
    const { chapterId } = req.params;
    try {
      const result = await Chapter.findByPk(chapterId);

      res.status(201).json({
        statusCode: 201,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ChapterController;
