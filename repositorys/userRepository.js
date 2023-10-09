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
    const values = [email, password, name];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  saveToken = async (email, token) => {
    const sql = `UPDATE user SET refreshToken = ? WHERE email = ?`;
    const values = [token, email];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updateUser = async (userId, updatedFields) => {
    const { name, address, phone, profileImage } = updatedFields;
    let sql = "UPDATE user SET";
    const values = [];
    if (name !== undefined) {
      sql += " name = ?,";
      values.push(name);
    }
    if (address !== undefined) {
      sql += " address = ?,";
      values.push(address);
    }
    if (phone !== undefined) {
      sql += " phone = ?,";
      values.push(phone);
    }
    if (profileImage !== undefined) {
      sql += " profileImage = ?,";
      values.push(profileImage);
    }
    sql = sql.replace(/,$/, "") + " WHERE userId = ?";
    values.push(userId);
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updateStateById = async (userId, newState) => {
    const sql = "UPDATE user SET state = ? WHERE userId = ?";
    const values = [newState, userId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updatePasswordByEmail = async (email, password) => {
    const sql = "UPDATE user SET password = ? WHERE email = ?";
    const values = [password, email];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updatePasswordById = async (userId, password) => {
    const sql = "UPDATE user SET password = ? WHERE userId = ?";
    const values = [password, userId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updateProfileById = async (userId, profileImage) => {
    const sql = "UPDATE user SET profileImage = ? WHERE userId = ?";
    const values = [profileImage, userId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };
}

module.exports = UserRepository;
