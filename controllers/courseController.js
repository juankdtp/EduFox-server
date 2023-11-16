const { Op } = require("sequelize");
const { Course, Chapter } = require("../models/index");

class CourseController {
  static async getAllCourse(req, res, next) {
    const { page, name } = req.query;
    let findName = "";

    let limitPage = 4;
    let pageStartPoint = 0;

    if (name) {
      findName = name;
    }

    if (page) {
      pageStartPoint = limitPage * (page - 1);
    }
    try {
      const result = await Course.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${findName}%`,
          },
        },
        limit: limitPage,
        offset: pageStartPoint,
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        data: result.rows,
        totalData: result.count,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCourseDetails(req, res, next) {
    const { CourseId } = req.params;
    try {
      const result = await Course.findByPk(CourseId, {
        include: Chapter,
      });
      console.log(result);
      res.status(201).json({
        statusCode: 201,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CourseController;
