const Student = require("../models/studentModel");

const user = require("../models/UserModel");
const studentquery = require("../services/studentQuery");

async function getByEmail(email) {
  return await user.findByPk(email);
}
async function getprofile(req, res) {
  const { email, role } = req.body;
  try {
    const newuser = await getByEmail(email).role;

    if (newuser.role !== role) {
      return res.status(402).json({
        success: false,
        message: "you are not authorized to see this profile",
      });
    }
    const data = await Student.findByPk(newuser.id);

    return res.status(200).json({
      success: true,
      message: "here is your  profile",
    });
  } catch (err) {
    console.log(`an eroor occured ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
}

async function addStudent(req, res) {
  const id = req.user.id;
  try {
    const data = req.body;
    const existinguser = await user.findByPk(id);
    if (existinguser && existinguser.role == "student") {
      await Student.upsert(data);
      return res.status(200).json({
        success: true,
        message: "created your profile",
      });
    }
  } catch (err) {
    console.log(`an eroor occured ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error ",
    });
  }
}
module.exports = { getprofile, addStudent };
