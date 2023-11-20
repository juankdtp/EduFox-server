const cloudinary = require("../helpers/cloudinary");
const { User } = require("../models/index");

class UserController {
  static async changePictProfile(req, res, next) {
    const { userId } = req.user;
    try {
      //   console.log("masukkkk", 6);
      console.log(cloudinary.uploader.upload);
      cloudinary.uploader.upload(req.file.path, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "internal server error ",
          });
        }

        const data = await User.update(
          {
            profilePicture: result.url,
          },
          { where: { id: userId } }
        );
        console.log(data, 22);

        res.status(200).json({
          data,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
