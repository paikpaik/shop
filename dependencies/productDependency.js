const ProductRepository = require("../repositorys/productRepository");
const ProductService = require("../services/productService");
const ProductController = require("../controllers/productController");

const AdminProductService = require("../services/adminProductService");
const AdminProductController = require("../controllers/adminProductController");

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const adminProductService = new AdminProductService(productRepository);
const adminProductController = new AdminProductController(adminProductService);

module.exports = {
  productRepository,
  productService,
  productController,
  adminProductService,
  adminProductController,
};
