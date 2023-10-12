class AdminProductController {
  constructor(adminProductService) {
    this.adminProductService = adminProductService;
  }

  getAllProduct = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page || 1);
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

  getPickProduct = async (req, res, next) => {
    try {
      const allPickedProduct =
        await this.adminProductService.allPickReadProduct();
      res.status(200).json(allPickedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(getPickProduct)",
      });
    }
  };

  pickProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const pickedProduct = await this.adminProductService.pickedProduct(
        productId
      );
      res.status(200).json(pickedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(pickProduct)",
      });
    }
  };
}

module.exports = AdminProductController;
