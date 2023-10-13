class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProduct = async (req, res, next) => {
    try {
      // sort: [new, max_price, min_price, max_discount(default)]
      const { sort, page } = req.query;
      const products = await this.productService.readAllProduct(sort, page);
      if (products.message) {
        return res.status(400).json(products);
      }
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(getProduct)",
      });
    }
  };

  searchProduct = async (req, res, next) => {
    try {
      // sort: [new, max_price, min_price, max_discount(default)]
      const { keyword, sort, page } = req.query;
      const products = await this.productService.readSearchProduct(
        keyword,
        sort,
        page
      );
      if (products.message) {
        return res.status(400).json(products);
      }
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(searchProduct)",
      });
    }
  };
}

module.exports = ProductController;
