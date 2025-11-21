const { getprofile, addStudent } = require("../controllers/studentController");

const express = require("express");
const router = express.Router();

router.post("/profile", getprofile);
router.post("/add-information", addStudent);

module.exports = router;
