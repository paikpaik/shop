const mysql = require("../config/mysql");

class ProductRepository {
  constructor(db) {
    this.db = db || mysql;
  }

  totalCountProduct = async () => {
    const sql = `SELECT COUNT(*) AS total FROM product`;
    const [rows] = await this.db.execute(sql);
    return rows[0].total;
  };

  getProductByPage = async (limit, startPage) => {
    const sql = `SELECT p.productId, c.category, p.name, p.price, p.discount, p.discountPrice, p.imageUrl, p.description
    FROM product p
    JOIN category c ON p.categoryId = c.categoryId
    ORDER BY p.productId DESC
    LIMIT ?
    OFFSET ?`;
    const values = [limit + "", startPage + ""];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

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

  findById = async (producId) => {
    const sql = `SELECT * FROM product WHERE productId = ?;`;
    const values = [producId];
    const [rows] = await this.db.execute(sql, values);
    return rows[0];
  };

  updateIsMDPickById = async (productId, NewIsMDPick) => {
    const sql = "UPDATE product SET isMDPick = ? WHERE productId = ?";
    const values = [NewIsMDPick, productId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };
}

module.exports = ProductRepository;
