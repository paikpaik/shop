const passport = require("passport");
const { accessJwtStrategy } = require("./strategies/accessJwtStrategy");

module.exports = () => {
  passport.use("access", accessJwtStrategy);
};
