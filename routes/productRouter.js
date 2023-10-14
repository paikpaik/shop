const express = require("express");
const { productController } = require("../dependencies/productDependency");

const router = express.Router();

// 전체상품조회(메인페이지)[]
router.get("/", productController.getProducts);

// 상품상세조회(상품상세페이지)
router.get("/:productId", productController.getProduct);

// 상품검색(메인페이지)
router.get("/search/keyword", productController.searchProducts);

// 카테고리별상품조회(메인페이지)
router.get("/category", productController.categoryProducts);

// MD추천제품조회(메인페이지)
router.get("/md/pick", productController.getIsMDPick);

module.exports = router;
