const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { setUserToken } = require("../utils/jwt");
const { randomPassword } = require("../utils/randomPassword");
const { sendMail } = require("../utils/sendmail");
const { authcodeToken } = require("../utils/authcodeToken");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  getUserByEmail = async (email) => {
    const user = await this.userRepository.findByEmail(email);
    return user;
  };

  getUserById = async (userId) => {
    const user = await this.userRepository.findById(userId);
    return user;
  };

  alreadyUser = async (email) => {
    const alreadyUser = await this.userRepository.findByEmail(email);
    if (alreadyUser) {
      if (!alreadyUser.state) {
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

  createAuthCode = async (email) => {
    const authCode = randomPassword();
    await sendMail(email, `tempPassword`, `${authCode}`);
    const authToken = authcodeToken(authCode);
    return authToken;
  };

  validatePatch = async ({ name, address, phone, profileImage }) => {
    if (!name && !address && !phone && !profileImage) {
      return { message: "업데이트할 내용이 존재하지 않습니다." };
    }
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (address) updatedFields.address = address;
    if (phone) updatedFields.phone = phone;
    if (profileImage) updatedFields.profileImage = profileImage;
    return updatedFields;
  };

  patchUserById = async (userId, updatedFields) => {
    const updatedUser = await this.userRepository.updateUser(
      userId,
      updatedFields
    );
    return updatedUser;
  };
}

module.exports = UserService;
