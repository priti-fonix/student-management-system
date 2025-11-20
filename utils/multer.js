const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/students"); // Folder must exist
  },
  filename: function (req, res, cb) {
    const filename = process.env.PORT_URL + +Date.now() + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,

  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
});

module.exports = multer;
