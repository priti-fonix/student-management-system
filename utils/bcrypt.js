const bcrypt = require("bcrypt");
require("dotenv").config();

async function hashPass(password) {
  const rounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function comparePass(password, hashedpassword) {
  if (!password || !hashedpassword) return false;
  const match = await bcrypt.compare(password, hashedpassword);
  return match;
}

module.exports = {
  hashPass,
  comparePass,
};
