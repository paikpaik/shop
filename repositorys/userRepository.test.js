const mysql = require("../config/mysql");
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
});
