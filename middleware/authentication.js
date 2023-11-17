const { tokenVerification } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error("TOKEN_INVALID");
    }

    const verified = tokenVerification(access_token);

    const {
      userId,
      userUsername,
      userEmail,
      userPremium,
      userPoint,
      userProfilePict,
    } = verified;

    // findOne User bahwa user tersebut memang ada dari database

    req.user = {
      userId,
      userUsername,
      userEmail,
      userPremium,
      userPoint,
      userProfilePict,
    };

    next();
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = authentication;
