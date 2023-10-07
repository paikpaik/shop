const UserService = require("./userService");
const userRepositoryMock = {
  findByEmail: jest.fn(),
  createUser: jest.fn(),
  saveToken: jest.fn(),
};

const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { setUserToken } = require("../utils/jwt");

jest.mock("../utils/hashPassword", () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
}));

jest.mock("../utils/jwt", () => ({
  setUserToken: jest.fn(),
}));

describe("./userService", () => {
  let userService;

  beforeEach(() => {
    userService = new UserService(userRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserByEmail", () => {
    it("email로 user를 반환해야 함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({
        email: "test@example.com",
      });

      const user = await userService.getUserByEmail("test@example.com");

      expect(user).toEqual({ email: "test@example.com" });
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
    });
  });

  describe("alreadyUser", () => {
    it("user가 없으면 ok를 반환해야 함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(undefined);

      const result = await userService.alreadyUser("test@example.com");

      expect(result).toBe("ok");
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
    });

    it("user의 state가 1이면 메시지를 반환해야 함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({ state: true });

      const result = await userService.alreadyUser("test@example.com");

      expect(result).toEqual({ message: "탈퇴한 계정입니다." });
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
    });

    it("user의 state가 1이 아니면 메시지를 반환해야 함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({ state: false });

      const result = await userService.alreadyUser("test@example.com");

      expect(result).toEqual({ message: "계정이 이미 가입되어 있습니다." });
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(
        "test@example.com"
      );
    });
  });

  // Add similar test cases for other methods like createUser and validateLogin
});
