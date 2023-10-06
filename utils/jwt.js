const jwt = require("jsonwebtoken");
const config = require("../config");

function setUserToken(user, isOnlyAccess) {
  const accessPayload = {
    userId: user.userId,
    email: user.email,
    name: user.name,
    profileImage: user.profileImage,
    isAdmin: user.isAdmin,
    isTempPassword: user.isTempPassword,
  };
  const accessOptions = {
    algorithm: config.jwt.algorithm,
    expiresIn: config.jwt.expiresInA,
  };
  const accessToken = jwt.sign(
    accessPayload,
    config.jwt.accessKey,
    accessOptions
  );

  if (!isOnlyAccess) {
    const refreshPayload = {
      userId: user.userId,
    };
    const refreshOptions = {
      algorithm: config.jwt.algorithm,
      expiresIn: config.jwt.expiresInR,
    };
    const refreshToken = jwt.sign(
      refreshPayload,
      config.jwt.refreshKey,
      refreshOptions
    );
    return { accessToken, refreshToken };
  }
  return { accessToken };
}

module.exports = { setUserToken };
