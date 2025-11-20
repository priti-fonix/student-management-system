const bcrypt = require("bcrypt");

function hashPass(password) {
  const salt = bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
}

function comparePass(password, hashedpassword) {
  const match = bcrypt.compare(password, hashedpassword);
  return match;
}

module.exports = {
  hashPass,
  comparePass,
};
