const User = require("../models/UserModel");
const { Op } = require("sequelize");

async function getall() {
  return await User.findAll({ where: {} });
}

async function ceateUser(data) {
  return await User.create(data);
}

async function getByEmail(email) {
  return await User.findByPk(email);
}
async function getByrole(userrole) {
  return await User.findAll({ where: { role: userrole } });
}
