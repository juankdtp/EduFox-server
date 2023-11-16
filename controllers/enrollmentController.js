const { Op } = require("sequelize");
const { Enrollment, Course, Chapter, User } = require("../models/index");

class EnrollmentController {
  static async getAllEnrollment(req, res, next) {
    const { userId } = req.user;
    const { page, name } = req.query;
    // let findName = "";

    let limitPage = 4;
    let pageStartPoint = 0;

    // if (name) {
    //   findName = name;
    // }

    if (page) {
      pageStartPoint = limitPage * (page - 1);
    }
    try {
      const result = await Enrollment.findAndCountAll({
        where: {
          UserId: userId,
          //   name: {
          //     [Op.iLike]: `%${findName}%`,
          //   },
        },
        limit: limitPage,
        offset: pageStartPoint,
        // order: [["name", "ASC"]],
      });
      //   const result = await Enrollment.findAll();

      res.status(201).json({
        statusCode: 201,
        data: result,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getEnrollmentCourse(req, res, next) {
    const { courseId } = req.params;
    const { userId } = req.user;
    try {
      //   const result = await Course.findByPk(CourseId, {
      //     include: [
      //       {
      //         model: Chapter,
      //         include: Enrollment,
      //       },
      //     ],
      //   });
      const result = await Enrollment.findOne({
        where: {
          CourseId: courseId,
          UserId: userId,
        },
        include: {
          model: Course,
          include: Chapter,
        },
      });

      //   console.log(result);

      res.status(201).json({
        statusCode: 201,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addEnrollment(req, res, next) {
    const { courseId } = req.params;
    const { userId } = req.user;
    try {
      const checkUser = await User.findByPk(userId);
      const checkCourse = await Course.findByPk(courseId);
      //   console.log(checkUser, 37);
      //   console.log(checkCourse, 38);
      //   console.log(checkUser.isPremium, 39);
      //   console.log(checkCourse.isPremium, 40);
      if (checkCourse.isPremium === true && checkUser.isPremium === false) {
        throw new Error("USER_NOT_PREMIUM");
      }
      const findEnroll = await Enrollment.findOne({
        where: {
          CourseId: courseId,
          UserId: userId,
        },
      });

      //   console.log(findEnroll);

      if (findEnroll) {
        throw new Error("ENROLLMENT_EXIST");
      }

      const findChapter = await Chapter.findOne({
        where: {
          CourseId: courseId,
          chapterNo: 1,
        },
      });
      //   console.log(findChapter);
      //   console.log(findChapter.id, 42);

      const result = await Enrollment.create({
        UserId: userId,
        CourseId: courseId,
        curChapterId: findChapter.id,
      });

      res.status(200).json({
        statusCode: 201,
        data: result,
      });
    } catch (err) {
      //   console.log(err);
      next(err);
    }
  }

  static async updateEnrollment(req, res, next) {
    const { courseId } = req.params;
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EnrollmentController;
