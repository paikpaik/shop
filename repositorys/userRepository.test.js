const mysql = require("../config/mysql");
const { hashPassword } = require("../utils/hashPassword");
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
      const result = await sut.createUser("test5@test.com", password, "test5");
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
});
