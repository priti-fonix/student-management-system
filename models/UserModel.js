const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { connectdb, sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    fullname: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      require: true,
    },
    otp: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "User", timestamps: true, createdAt: false }
);

module.exports = User;
