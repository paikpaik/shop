const UserService = require("./userService");

describe("UserService", () => {
  let userService;
  let UserRepository;

  beforeEach(() => {
    UserRepository = {
      findByEmail: async (email) => {
        if (email === "test@test.com") {
          return { id: 1, name: "test", email: "test@test.com" };
        }
        return null;
      },
    };
    userService = new UserService(UserRepository);
  });

  test("email에 해당하는 data가 있으면 객체를 리턴", async () => {
    const email = "test@test.com";
    const result = await userService.getUserByEmail(email);
    expect(result).toEqual({
      id: 1,
      name: "test",
      email: "test@test.com",
    });
  });

  test("email에 해당하는 data가 없으면 null을 리턴", async () => {
    const email = "nonExist@test.com";
    const result = await userService.getUserByEmail(email);
    expect(result).toBeNull();
  });
});
