class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getProducts = async (req, res, next) => {
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
        error: "Internal Server Error - adminProductController(getProducts)",
      });
    }
  };

  getProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const product = await this.productService.readProduct(productId);
      if (product.message) {
        return res.status(400).json(product);
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(getProduct)",
      });
    }
  };

  searchProducts = async (req, res, next) => {
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
        error: "Internal Server Error - adminProductController(searchProducts)",
      });
    }
  };

  categoryProducts = async (req, res, next) => {
    try {
      // sort: [new, max_price, min_price, max_discount(default)]
      const { category, sort, page } = req.query;
      const products = await this.productService.readCategoryProduct(
        category,
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
        error:
          "Internal Server Error - adminProductController(categoryProducts)",
      });
    }
  };
}

module.exports = ProductController;
