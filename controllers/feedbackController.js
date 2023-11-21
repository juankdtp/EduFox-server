const { Feedback, Course, User } = require("../models/index");

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

      const feedback = await Feedback.findAndCountAll({
        where: {
          CourseId: courseId,
        },
      });

      const user = await User.findByPk(userId);
      // console.log(user, 23);
      const userPoint = user.point;
      // console.log(userPoint, 25);
      //   console.log(feedback.count, 21);
      //   console.log(feedback.rows, 22);
      // console.log(course.rows, 23);

      let totalRating = 0;
      let meanRating = 0;

      for (let i = 0; i < feedback.count; i++) {
        totalRating += feedback.rows[i].rating;
      }

      //   console.log(totalRating, 31);
      //   console.log(checkFeedback.rating, 32);
      //     totalRating =
      //   let meanRating = totalRating / feedback.count;
      //   console.log(meanRating, 33);

      //   const updateCourse = await Course.update(
      //     {
      //       rating: meanRating,
      //     },
      //     {
      //       where: {
      //         id: courseId,
      //       },
      //     }
      //   );

      if (checkFeedback) {
        // console.log(totalRating, 62);
        // console.log(checkFeedback.rating, 63);
        totalRating = totalRating - checkFeedback.rating;
        // console.log(totalRating, 64);
        totalRating = totalRating + +rating;
        // console.log(totalRating, 67);
        meanRating = totalRating / feedback.count;
        // console.log(meanRating, 70);
        // const courseCheck = await Course.findByPk(courseId);
        // console.log(courseCheck, 72);
        const updateCourse = await Course.update(
          {
            rating: meanRating,
          },
          {
            where: {
              id: courseId,
            },
          }
        );
        // console.log(updateCourse, 82);
        // console.log(courseId, 83);

        const updateFeedback = await Feedback.update(
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
          data: updateFeedback,
        });
      } else {
        // console.log(totalRating, 98);
        totalRating = totalRating + +rating;
        // console.log(totalRating, 100);
        meanRating = totalRating / (feedback.count + 1);
        // console.log(meanRating, 102);

        const updateCourse = await Course.update(
          {
            rating: meanRating,
          },
          {
            where: {
              id: courseId,
            },
          }
        );

        const updateUser = await User.update(
          {
            point: userPoint + 5,
          },
          {
            where: {
              id: userId,
            },
          }
        );

        const createFeedback = await Feedback.create({
          rating,
          comment,
          CourseId: courseId,
          UserId: userId,
        });

        res.status(200).json({
          statusCode: 200,
          data: createFeedback,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = FeedbackController;
