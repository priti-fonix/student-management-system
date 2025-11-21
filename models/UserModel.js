const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { connectdb, sequelize } = require("../config/db");

const users = sequelize.define(
  "users",
  {
    fullname: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      enum: ["student", "tutor", "admin"],
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
  { sequelize, modelName: "users", timestamps: true, createdAt: false }
);

module.exports = users;
