"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Enrollment);
      User.hasMany(models.Feedback);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "username must be unique"
        },
        validate: {
          notEmpty: {
            msg: "need username",
          },
          notNull: {
            msg: "need username",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email must be unique"
        },
        validate: {
          notEmpty: {
            msg: "need email",
          },
          notNull: {
            msg: "need email",
          },
          isEmail: {
            msg: "email not valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "need password",
          },
          notNull: {
            msg: "meed password",
          },
        },
      },
      isPremium: DataTypes.BOOLEAN,
      point: DataTypes.INTEGER,
      profilePicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });

  return User;
};
