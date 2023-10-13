const mysql = require("../config/mysql");
const { productSortAndPaging } = require("../myfx/query");

class ProductRepository {
  constructor(db) {
    this.db = db || mysql;
  }
  /*******************
   ***    Admin    ***
   *******************/

  getProductByPage = async (limit, startPage) => {
    const sql = `SELECT p.*, c.category
    FROM product p
    JOIN category c ON p.categoryId = c.categoryId
    ORDER BY p.productId DESC
    LIMIT ?
    OFFSET ?`;
    const values = [limit + "", startPage + ""];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  /*******************
   ***    User     ***
   *******************/

  getAllProducts = async (sort, page) => {
    const result = await productSortAndPaging(null, null, sort, page);
    const { query, pageSize, skip } = result;
    const sql = query;
    const values = [pageSize + "", skip + ""];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  /*******************
   ***    Common   ***
   *******************/
  getProductById = async (productId) => {
    const sql = `SELECT * FROM product WHERE productId = ?`;
    const values = [productId];
    const [rows] = await this.db.execute(sql, values);
    return rows[0];
  };

  totalCountProduct = async () => {
    const sql = `SELECT COUNT(*) AS total FROM product`;
    const [rows] = await this.db.execute(sql);
    return rows[0].total;
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

  updateProduct = async (productId, updatedFields) => {
    const { name, price, discount, discountPrice, description } = updatedFields;
    let sql = "UPDATE product SET";
    const values = [];
    if (name !== undefined) {
      sql += " name = ?,";
      values.push(name);
    }
    if (price !== undefined) {
      sql += " price = ?,";
      values.push(price);
    }
    if (discount !== undefined) {
      sql += " discount = ?,";
      values.push(discount);
    }
    if (discountPrice !== undefined) {
      sql += " discountPrice = ?,";
      values.push(discountPrice);
    }
    if (description !== undefined) {
      sql += " description = ?,";
      values.push(description);
    }
    sql = sql.replace(/,$/, "") + " WHERE productId = ?";
    values.push(productId);
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updateImageUrlById = async (productId, productImage) => {
    const sql = "UPDATE product SET imageUrl = ? WHERE productId = ?";
    const values = [productImage, productId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  findById = async (producId) => {
    const sql = `SELECT * FROM product WHERE productId = ?;`;
    const values = [producId];
    const [rows] = await this.db.execute(sql, values);
    return rows[0];
  };

  getProductByPick = async (isMDPick) => {
    const sql = `SELECT * FROM product WHERE isMDPick = ?;`;
    const values = [isMDPick];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  updateIsMDPickById = async (productId, NewIsMDPick) => {
    const sql = "UPDATE product SET isMDPick = ? WHERE productId = ?";
    const values = [NewIsMDPick, productId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };

  deleteProductById = async (productId) => {
    const sql = `DELETE FROM product WHERE productId = ?`;
    const values = [productId];
    const [rows] = await this.db.execute(sql, values);
    return rows;
  };
}

module.exports = ProductRepository;
