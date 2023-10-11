class AdminProductController {
  constructor(adminProductService) {
    this.adminProductService = adminProductService;
  }

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
