const mysql = require("../config/mysql");

class ProductRepository {
  constructor(db) {
    this.db = db || mysql;
  }

  createProduct = async (
    imageUrl,
    category,
    name,
    price,
    discount,
    discountPrice,
    description
  ) => {
    let sql = `SELECT category FROM category WHERE category = ?`;
    let values = [category];
    let [rows] = await this.db.execute(sql, values);
    let categoryId;
    if (rows.length === 0) {
      sql = `INSERT INTO category (category) VALUES (?)`;
      values = [category];
      [rows] = await this.db.execute(sql, values);
      categoryId = rows.insertId;
    } else {
      sql = `SELECT * FROM category WHERE category = ?`;
      values = [category];
      [rows] = await this.db.execute(sql, values);
      categoryId = rows[0].categoryId;
    }
    sql = `INSERT INTO product (categoryId,
      name,
      price,
      discount,
      discountPrice,
      imageUrl,
      description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    values = [
      categoryId,
      name,
      price,
      discount,
      discountPrice,
      imageUrl,
      description,
    ];
    [rows] = await this.db.execute(sql, values);
    return rows;
  };
}

module.exports = ProductRepository;
