class AdminProductController {
  constructor(adminProductService) {
    this.adminProductService = adminProductService;
  }

  getAllProduct = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const allReadProduct = await this.adminProductService.allReadProduct(
        page
      );
      res.status(200).json(allReadProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(getAllProduct)",
      });
    }
  };

  postProduct = async (req, res, next) => {
    try {
      const filename = req.file.filename;
      const { category, name, price, discount, discountPrice, description } =
        req.body;
      const validateProduct = await this.adminProductService.validateProduct({
        filename,
        category,
        name,
        price,
        description,
      });
      if (validateProduct !== "ok") {
        return res.status(400).json(validateProduct);
      }
      const createProduct = await this.adminProductService.createProduct({
        filename,
        category,
        name,
        price,
        discount,
        discountPrice,
        description,
      });
      res.status(200).json(createProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(postProduct)",
      });
    }
  };
}

module.exports = AdminProductController;
