const jwt = require("jsonwebtoken");
const config = require("../config");

function authcodeToken(authCode) {
  const payload = {
    authCode: authCode,
  };
  const options = {
    algorithm: config.jwt.algorithm,
    expiresIn: config.jwt.expiresInC,
  };
  return jwt.sign(payload, config.jwt.authcodeKey, options);
}

module.exports = { authcodeToken };
