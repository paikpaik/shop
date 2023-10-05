class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  postUser = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const alreadyUser = await this.userService.getUserByEmail(email);
      if (alreadyUser) {
        if (!alreadyUser.state) {
          return res.status(400).json({ message: "탈퇴한 계정입니다." });
        }
        return res
          .status(400)
          .json({ message: "계정이 이미 가입되어 있습니다." });
      }
      const user = await this.userService.createUser({
        email,
        password,
        name,
      });
      // req.user = user;
      // next();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error - userController" });
    }
  };
}

module.exports = UserController;
