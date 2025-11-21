const { Student } = require("../models/studentModel");

async function updateStudentPhoto(id, photoPath) {
  return await Student.update({ photo: photoPath }, { where: { id } });
}

async function getStudentById(id) {
  return Student.findByPk(id);
}
async function updateStudent(id, updateData) {
  const [updatedRows] = await Student.update(updateData, {
    where: { id },
  });

  return updatedRows; // returns number of rows updated
}

async function getStudentById(id) {
  return Student.findByPk(id);
}

module.exports = {
  updateStudentPhoto,
  getStudentById,
  updateStudent,
  getStudentById,
};
