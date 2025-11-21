const { uploadStudentPhoto } = require("../controllers/AdminController");

// Photo upload route
router.post("/students/:id/photo", upload.single("photo"), uploadStudentPhoto);
