const express = require("express");
const { productController } = require("../dependencies/productDependency");

const router = express.Router();

router.get("/", productController.getProduct);

module.exports = router;
