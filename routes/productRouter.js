const express = require("express");
const { productController } = require("../dependencies/productDependency");

const router = express.Router();

// 전체상품조회(메인페이지)
router.get("/", productController.getProduct);

module.exports = router;
