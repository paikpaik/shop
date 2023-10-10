class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProduct = async (req, res, next) => {};
}

module.exports = ProductController;
