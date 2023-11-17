const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    message = err.errors[0].message;
  }

  if (err.message === "USER_NOT_FOUND" || err.message === "PASSWORD_INVALID") {
    (statusCode = 401), (message = "Email or Password Invalid");
  }

  if (err.message === "TOKEN_INVALID") {
    (statusCode = 401), (message = "Invalid token");
  }

  if (err.message === "DATA_NOT_FOUND") {
    (statusCode = 404), (message = "Data not found");
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};

module.exports = errorHandler;
