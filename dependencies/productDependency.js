const ProductRepository = require("../repositorys/productRepository");
const ProductService = require("../services/productService");
const ProductController = require("../controllers/productController");

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

module.exports = {
  productRepository,
  productService,
  productController,
};
