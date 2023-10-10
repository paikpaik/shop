const mysql = require("../config/mysql");

class ProductRepository {
  constructor(db) {
    this.db = db || mysql;
  }
}

module.exports = ProductRepository;
