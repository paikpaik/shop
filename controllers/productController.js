class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProduct = async (req, res, next) => {
    try {
      // sort: [new, max_price, min_price, max_discount]
      const { sort, page } = req.query;
      const products = await this.productService.readAllProduct(sort, page);
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(getProduct)",
      });
    }
  };
}

module.exports = ProductController;
