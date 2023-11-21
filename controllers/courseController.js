const { Op } = require("sequelize");
const { Course, Chapter } = require("../models/index");

class CourseController {
  static async getAllCourse(req, res, next) {
    const { page, name, categoryId } = req.query;
    let findName = "";

    let limitPage = 8;
    let pageStartPoint = 0;

    const filterOptions = {
      name: {
        [Op.iLike]: `%${findName}%`,
      },
    };

    if (name) {
      findName = name;
    }

    if (page) {
      pageStartPoint = limitPage * (page - 1);
    }

    if (categoryId) {
      filterOptions.CategoryId = categoryId;
    }

    try {
      const result = await Course.findAndCountAll({
        where: filterOptions,
        limit: limitPage,
        offset: pageStartPoint,
        order: [["name", "ASC"]],
      });

      res.status(200).json({
        statusCode: 200,
        currentPage: page || 1,
        data: result.rows,
        totalData: result.count,
        totalPage: Math.ceil(result.count / limitPage),
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCourseDetails(req, res, next) {
    const { courseId } = req.params;
    try {
      const result = await Course.findByPk(courseId, {
        include: {
          model: Chapter,
          // sort by chapterNo, ASC
          order: [["chapterNo", "ASC"]],
        },
      });
      if (!result) {
        throw new Error("DATA_NOT_FOUND");
      }
      // console.log(result);
      res.status(200).json({
        statusCode: 200,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CourseController;
