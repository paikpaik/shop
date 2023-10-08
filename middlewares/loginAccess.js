const passport = require("passport");

function loginAccess(req, res, next) {
  passport.authenticate("access", { session: false })(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: `로그인이 필요한 서비스입니다.` });
    } else {
      next();
    }
  });
}

module.exports = { loginAccess };
