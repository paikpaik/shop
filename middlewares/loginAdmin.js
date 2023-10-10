function loginAdmin(req, res, next) {
  const user = req.user;
  const email = user.email;
  if (!user.isAdmin) {
    return res.status(400).json({
      message: `${email}계정은 관리자 권한이 없습니다. 관리자 계정으로 로그인해주세요`,
    });
  }
  next();
}

module.exports = { loginAdmin };
