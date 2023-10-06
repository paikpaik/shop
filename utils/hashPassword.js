const bcrypt = require("bcrypt");

function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
function comparePassword(password, userPassword) {
  const comparePassword = bcrypt.compare(password, userPassword);
  return comparePassword;
}

module.exports = { hashPassword, comparePassword };
