const mysql = require("../config/mysql");

class UserRepository {
  constructor(db) {
    this.db = db || mysql;
  }

  findByEmail = async (email) => {
    const sql = `SELECT * FROM user WHERE email = ?;`;
    const values = [email];
    const result = await this.db.execute(sql, values);
    return result[0][0];
  };

  findById = async (userId) => {
    const sql = `SELECT * FROM user WHERE userId = ?;`;
    const values = [userId];
    const result = await this.db.execute(sql, values);
    return result[0][0];
  };

  createUser = async (email, password, name) => {
    const sql = `INSERT INTO user (email, password, name) VALUES (?, ?, ?);`;
    const [rows] = await this.db.execute(sql, [email, password, name]);
    return rows;
  };

  saveToken = async (email, token) => {
    const sql = `UPDATE user SET refreshToken = ? WHERE email = ?`;
    const [rows] = await this.db.execute(sql, [token, email]);
    return rows;
  };
}

module.exports = UserRepository;
