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

  patchProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const { name, price, discount, description } = req.body;
      const updatedFields = await this.adminProductService.validatePatch({
        name,
        price,
        discount,
        description,
      });
      if (updatedFields.message) return res.status(400).json(updatedFields);
      const result = await this.adminProductService.patchProductById(
        productId,
        updatedFields
      );
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(patchProduct)",
      });
    }
  };

  patchProductImage = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const filename = req.file.filename;
      const patchedProductImage =
        await this.adminProductService.patchProductImage(productId, filename);
      res.status(200).json(patchedProductImage);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Internal Server Error - adminProductController(patchProductImage)",
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
      const pickedProduct = await this.adminProductService.pickProduct(
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

  deleteProduct = async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const deletedImage = await this.adminProductService.deleteImage(
        productId
      );
      if (deletedImage !== "ok") {
        res.status(400).json(deletedImage);
      }
      const deletedProduct = await this.adminProductService.deleteProduct(
        productId
      );
      res.status(200).json(deletedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error - adminProductController(deleteProduct)",
      });
    }
  };
}

module.exports = AdminProductController;
