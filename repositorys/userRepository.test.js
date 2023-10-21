const mysql = require("../config/mysql");
const { hashPassword } = require("../utils/hashPassword");
const { setUserToken } = require("../utils/jwt");
const UserRepository = require("./userRepository");

let db;

beforeAll(() => {
  db = mysql; // MySQL 연결을 열고 db에 할당
});

afterAll(async () => {
  if (db) {
    await db.end(); // MySQL 연결을 닫음
  }
});

describe("UserRepository", () => {
  describe("findByEmail", () => {
    it("이메일을 인자로 db에 이메일이 없으면 undefined를 리턴", async () => {
      const sut = new UserRepository(db);
      const expected = undefined;
      const result = await sut.findByEmail("testtest@test.com");
      expect(result).toEqual(expected);
    });
    it("이메일을 인자로 db에 이메일이 있으면 user객체를 리턴", async () => {
      const sut = new UserRepository(db);
      const expected = { email: "test@test.com" };
      const result = await sut.findByEmail("test@test.com");
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });

  describe("findById", () => {
    it("userId를 인자로 db에 userId가 없으면 undefined를 리턴", async () => {
      const sut = new UserRepository(db);
      const expected = undefined;
      const result = await sut.findById(1);
      expect(result).toEqual(expected);
    });
    it("userId를 인자로 db에 userId가 있으면 user 객체를 리턴", async () => {
      const sut = new UserRepository(db);
      const expected = { userId: 2 };
      const result = await sut.findById(2);
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });

  describe("createUser", () => {
    let hashedPassword;
    beforeEach(async () => {
      hashedPassword = await hashPassword("123456");
    });
    afterEach(() => {
      hashedPassword = "";
    });
    it("email, password, name을 인자로 user객체를 생성", async () => {
      const sut = new UserRepository(db);
      const password = hashedPassword;
      const expected = { affectedRows: 1 };
      const result = await sut.createUser(`test8@test.com`, password, `test8`);
      expect(result).toEqual(expect.objectContaining(expected));
    });
    it("email, password, name중 인자가 부족하면 에러를 던짐", async () => {
      const sut = new UserRepository(db);
      const password = hashedPassword;
      try {
        const result = await sut.createUser("test4@test.com", password);
        expect(result).toBeUndefined();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe(
          "Bind parameters must not contain undefined. To pass SQL NULL specify JS null"
        );
      }
    });
  });

  describe("saveToken", () => {
    let token;
    let user;
    beforeEach(async () => {
      user = {
        userId: 7,
        name: "test4",
        email: "test4@test.com",
        password:
          "$2b$10$G98iR9Be3r50d7iQ4GqedOnExffS/VSaIV3B8NBN0cPcP1J8T/Ar.",
        phone: "",
        address: "",
        profileImage: "http://localhost:3000/defaultImage.png",
        refreshToken: "",
        isAdmin: 0,
        state: 1,
        createdAt: "2023-10-18T09:09:53.000Z",
      };
      token = await setUserToken(user, 0);
    });
    afterEach(() => {
      user = "";
      token = "";
    });
    it("이메일과 토큰이 들어오면 해당 이메일을 가진 유저의 토큰이 갱신됨.", async () => {
      const sut = new UserRepository(db);
      const tokenValue = token.refreshToken;
      const expected = { affectedRows: 1 };
      const result = await sut.saveToken("test4@test.com", tokenValue);
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });
  describe("updateUser", () => {
    it("userId와 name이 있으면 name만 변경됨. ", async () => {
      const sut = new UserRepository(db);
      const expected = { affectedRows: 1 };
      const result = await sut.updateUser(7, { name: "updateTest" });
      expect(result).toEqual(expect.objectContaining(expected));
    });
    it("userId와 address가 있으면 address만 변경됨. ", async () => {
      const sut = new UserRepository(db);
      const expected = { affectedRows: 1 };
      const result = await sut.updateUser(7, { address: "USA" });
      expect(result).toEqual(expect.objectContaining(expected));
    });
    it("userId와 phone이 있으면 phone만 변경됨. ", async () => {
      const sut = new UserRepository(db);
      const expected = { affectedRows: 1 };
      const result = await sut.updateUser(7, { phone: "010-0000-0000" });
      expect(result).toEqual(expect.objectContaining(expected));
    });
    it("userId와 profileImage가 있으면 profileImage만 변경됨. ", async () => {
      const sut = new UserRepository(db);
      const expected = { affectedRows: 1 };
      const result = await sut.updateUser(7, {
        profileImage: "http://localhost:3000/profileImage.png",
      });
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });
  describe.only("updateStateById", () => {
    it("newState와 userId가 있으면 user의 state가 변경됨.", async () => {
      const sut = new UserRepository(db);
      const expected = { affectedRows: 1 };
      const result = await sut.updateStateById(7, 0);
      expect(result).toEqual(expect.objectContaining(expected));
    });
    it("newState와 userId가 있으면 user의 state가 변경됨.", async () => {
      const sut = new UserRepository(db);
      const expected = { affectedRows: 1 };
      const result = await sut.updateStateById(7, 1);
      expect(result).toEqual(expect.objectContaining(expected));
    });
  });
});
