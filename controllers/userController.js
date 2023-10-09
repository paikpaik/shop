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
      const { userId } = req.user;
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error - userController(getUser)" });
    }
  };

  patchUser = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { name, address, phone, profileImage } = req.body;
      const updatedFields = await this.userService.validatePatch({
        name,
        address,
        phone,
        profileImage,
      });
      if (updatedFields.message) return res.status(400).json(updatedFields);
      const result = await this.userService.patchUserById(
        userId,
        updatedFields
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error - userController(patchUser)" });
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const result = await this.userService.dormantUserById(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error - userController(dormantUser)" });
    }
  };

  tempPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const existUser = await this.userService.existUser(email);
      if (existUser !== "ok") {
        return res.status(400).json(existUser);
      }
      const sendTempPwd = await this.userService.sendTempPwd(email);
      res.status(200).json(sendTempPwd);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error - userController(tempPassword)",
      });
    }
  };

  patchPassword = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { currentPwd, changePwd } = req.body;
      const validatePwd = await this.userService.validatePwd(
        userId,
        currentPwd
      );
      if (validatePwd !== "ok") {
        return res.status(400).json(validatePwd);
      }
      const changedPwd = await this.userService.changePwd(userId, changePwd);
      return res.status(200).json(changedPwd);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Internal Server Error - userController(patchPassword)",
      });
    }
  };
}

module.exports = UserController;
