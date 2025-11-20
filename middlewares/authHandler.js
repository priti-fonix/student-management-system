function isStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}

function isTutor(req, res, next) {
  if (req.user.role !== "tutor") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}

module.exports = {
  isAdmin,
  isStudent,
  isTutor,
};
