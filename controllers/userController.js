class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  postUser = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const alreadyUser = await this.userService.alreadyUser(email);
      if (alreadyUser !== "ok") {
        return res.status(400).json(alreadyUser);
      }
      const user = await this.userService.createUser({
        email,
        password,
        name,
      });
      // req.user = user;
      // next();
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Internal Server Error - userController(postUser)" });
    }
  };

  authUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const validateLogin = await this.userService.validateLogin(
        email,
        password
      );
      return res.status(200).json(validateLogin);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error - userController(authUser)" });
    }
  };

  authEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const alreadyUser = await this.userService.alreadyUser(email);
      if (alreadyUser !== "ok") {
        return res.status(400).json(alreadyUser);
      }
      const authToken = await this.userService.createAuthCode(email);
      res.status(200).json({ authToken });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error - userController(authEmail)" });
    }
  };

  getUser = async (req, res, next) => {
    try {
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error - userController(getUser)" });
    }
  };
}

module.exports = UserController;
