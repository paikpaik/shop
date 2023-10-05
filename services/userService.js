const { hashPassword } = require("../utils/hashPassword");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  getUserByEmail = async (email) => {
    const user = await this.userRepository.findByEmail(email);
    return user;
  };

  createUser = async ({ email, password, name }) => {
    const hashedPassword = await hashPassword(password);
    const createdUser = await this.userRepository.createUser(
      email,
      hashedPassword,
      name
    );
    return createdUser;
  };
}

module.exports = UserService;
