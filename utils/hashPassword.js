const bcrypt = require("bcrypt");

function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

module.exports = { hashPassword };
