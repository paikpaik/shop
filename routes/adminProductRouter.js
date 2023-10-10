const express = require("express");
const { productController } = require("../dependencies/productDependency");

const router = express.Router();

// 관리자전체상품조회
router.get("/", productController.getProduct);

// 관리자상품추가
router.post("/add");

module.exports = router;
