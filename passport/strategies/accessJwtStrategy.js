const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../../config");
const { userRepository } = require("../../dependencies/userDependency");

const jwtOptions = {
  secretOrKey: config.jwt.accessKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const accessJwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await userRepository.findByid(payload.userId);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = { accessJwtStrategy };
