const dotenv = require("dotenv");

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env파일이 없습니다.");
}

module.exports = {
  port: process.env.PORT,

  cookieSecret: process.env.COOKIE_SECRET,

  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  jwt: {
    algorithm: process.env.ALGORITHM,
    expiresInA: process.env.A_EXPIRESIN,
    accessKey: process.env.ACCESS_SECRET,
    expiresInR: process.env.R_EXPIRESIN,
    refreshKey: process.env.REFRESH_SECRET,
  },
};
