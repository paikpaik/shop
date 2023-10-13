const express = require("express");
const { productController } = require("../dependencies/productDependency");

const router = express.Router();

// 전체상품조회(메인페이지)
router.get("/", productController.getProduct);

// 상품검색(메인페이지)
router.get("/search", productController.searchProduct);

// 카테고리별상품조회(메인페이지)
router.get("/category", productController.categoryProduct);

module.exports = router;
