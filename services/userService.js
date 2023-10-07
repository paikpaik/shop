const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { setUserToken } = require("../utils/jwt");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  getUserByEmail = async (email) => {
    const user = await this.userRepository.findByEmail(email);
    return user;
  };

  alreadyUser = async (email) => {
    const alreadyUser = await this.userRepository.findByEmail(email);
    if (alreadyUser) {
      if (alreadyUser.state) {
        return { message: "탈퇴한 계정입니다." };
      }
      return { message: "계정이 이미 가입되어 있습니다." };
    }
    return "ok";
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

  validateLogin = async (email, password) => {
    const user = await this.userRepository.findByEmail(email);
    if (user === undefined) {
      return { message: "계정이 존재하지 않습니다." };
    }
    const userPassword = user.password;
    if (!user.state) {
      return { message: "탈퇴한 계정입니다." };
    }
    if (!(await comparePassword(password, userPassword))) {
      return { message: "비밀번호가 틀렸습니다." };
    }
    const token = await setUserToken(user, 0);
    if (token.refreshToken) {
      const refreshToken = token.refreshToken;
      await this.userRepository.saveToken(email, refreshToken);
    }
    return token;
  };
}

module.exports = UserService;
