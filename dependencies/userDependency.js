const UserRepository = require("../repositorys/userRepository");
const UserService = require("../services/userService");
const UserController = require("../controllers/userController");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

module.exports = {
  userRepository,
  userService,
  userController,
};
