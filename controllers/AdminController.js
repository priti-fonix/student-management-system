const studentService = require("../services/studentQuery");
const userService = require("../services/userquery");

const uploadStudentPhoto = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // file path -> save in DB
    const filePath = req.file.path;

    const student = await studentService.getStudentById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await studentService.updateStudentPhoto(studentId, filePath);

    res.json({
      message: "Student photo uploaded successfully",
      photo: filePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadStudentPhoto };
