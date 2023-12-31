const path = require("path");
const fs = require("fs").promises;
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { setUserToken } = require("../utils/jwt");
const { randomPassword } = require("../utils/randomPassword");
const { sendMail } = require("../utils/sendmail");
const { authcodeToken } = require("../utils/authcodeToken");
const config = require("../config");

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
    if (hashedPassword.length < 20) {
      return { message: "비밀번호를 암호화 하는데 실패했습니다." };
    }
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
      return { message: "비밀번호가 일치하지 않습니다." };
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
    await sendMail(email, `shop 인증코드입니다.`, `${authCode}`);
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

  dormantUserById = async (userId) => {
    let newState = "";
    const user = await this.userRepository.findById(userId);
    if (user.state === 1) {
      newState = 0;
    } else {
      newState = 1;
    }
    const dormantUser = await this.userRepository.updateStateById(
      userId,
      newState
    );
    return dormantUser;
  };

  existUser = async (email) => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return { message: "해당 메일의 계정이 존재하지 않습니다." };
    }
    if (!user.state) {
      return { message: "해당 메일의 계정은 탈퇴한 상태입니다." };
    }
    return "ok";
  };

  sendTempPwd = async (email) => {
    const tempPassword = randomPassword();
    const hashedPassword = await hashPassword(tempPassword);
    await this.userRepository.updatePasswordByEmail(email, hashedPassword);
    await sendMail(email, `shop 임시비밀번호입니다.`, `${tempPassword}`);
    return { message: `${email}으로 임시 비밀번호를 전송했습니다.` };
  };

  validatePwd = async (userId, currentPwd) => {
    const user = await this.userRepository.findById(userId);
    const userPassword = user.password;
    if (!(await comparePassword(currentPwd, userPassword))) {
      return { message: "비밀번호가 일치하지 않습니다." };
    }
    return "ok";
  };

  changePwd = async (userId, changePwd) => {
    const hashedPassword = await hashPassword(changePwd);
    const changedPwd = await this.userRepository.updatePasswordById(
      userId,
      hashedPassword
    );
    return changedPwd;
  };

  deleteImage = async (imageUrl) => {
    const deletedImagePath = imageUrl.replace(config.url.devUrl, "");
    const deletedUrlPath = path.join(__dirname, "../public", deletedImagePath);
    await fs.unlink(deletedUrlPath, (error) => {
      if (error) return { message: "프로필이미지 삭제에 실패했습니다." };
    });
    return "ok";
  };

  patchProfileImage = async (userId, filename) => {
    const profileImage = `${config.url.devUrl}${filename}`;
    const result = await this.userRepository.updateProfileById(
      userId,
      profileImage
    );
    return result;
  };
}

module.exports = UserService;
