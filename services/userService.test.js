const UserService = require("./userService");

describe("UserService", () => {
  let userService;
  let userRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
    userService = new UserService(userRepositoryMock);
  });

  describe("getUserByEmail", () => {
    test("email이 존재하면 user를 리턴함.", async () => {
      const expectedUser = {
        userId: 1,
        name: "test",
        email: "test@example.com",
      };
      userRepositoryMock.findByEmail.mockResolvedValue(expectedUser);

      const email = "test@example.com";
      const result = await userService.getUserByEmail(email);

      expect(result).toEqual(expectedUser);
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    });

    test("email이 존재하지 않으면 null을 리턴함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(null);

      const email = "nonexistent@example.com";
      const result = await userService.getUserByEmail(email);

      expect(result).toBeNull();
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe("getUserById", () => {
    test("userId 존재하면 user를 리턴함.", async () => {
      const expectedUser = {
        userId: 1,
        name: "test",
        email: "test@example.com",
      };
      userRepositoryMock.findById.mockResolvedValue(expectedUser);

      const userId = 1;
      const result = await userService.getUserById(userId);

      expect(result).toEqual(expectedUser);
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    });

    test("userId 존재하지 않으면 null을 리턴함.", async () => {
      userRepositoryMock.findById.mockResolvedValue(null);

      const userId = 9999;
      const result = await userService.getUserById(userId);

      expect(result).toBeNull();
      expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId);
    });
  });

  describe("alreadyUser", () => {
    test("유저가 존재하고 유저의 state가 0이면 '탈퇴한 계정입니다.'를 리턴함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({ state: 0 });

      const email = "inactive@example.com";
      const result = await userService.alreadyUser(email);

      expect(result).toEqual({ message: "탈퇴한 계정입니다." });
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    });

    test("유저가 존재하고 유저의 state가 1이면 '계정이 이미 가입되어 있습니다.'를 리턴함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue({ state: 1 });

      const email = "active@example.com";
      const result = await userService.alreadyUser(email);

      expect(result).toEqual({ message: "계정이 이미 가입되어 있습니다." });
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    });

    test("유저가 존재하지 않으면'ok'를 리턴함.", async () => {
      userRepositoryMock.findByEmail.mockResolvedValue(null);

      const email = "nonexistent@example.com";
      const result = await userService.alreadyUser(email);

      expect(result).toBe("ok");
      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    });
  });
});
