const { Feedback, Course } = require("../models/index");

class FeedbackController {
  static async addFeedback(req, res, next) {
    const { userId } = req.user;
    const { courseId } = req.params;
    const { rating, comment } = req.body;
    try {
      const checkFeedback = await Feedback.findOne({
        where: {
          CourseId: courseId,
          UserId: userId,
        },
      });

      const course = await Course.findAndCountAll({
        where: {
          id: courseId,
        },
      });
      console.log(course.count, 21);
      console.log(course.rows, 22);

      if (checkFeedback) {
        const feedback = await Feedback.update(
          {
            rating,
            comment,
          },
          {
            where: {
              CourseId: courseId,
              UserId: userId,
            },
          }
        );

        res.status(200).json({
          statusCode: 200,
          data: feedback,
        });
      } else {
        const feedback = await Feedback.create({
          rating,
          comment,
          CourseId: courseId,
          UserId: userId,
        });

        res.status(200).json({
          statusCode: 200,
          data: feedback,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FeedbackController;
