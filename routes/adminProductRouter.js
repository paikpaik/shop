const express = require("express");
const { adminProductController } = require("../dependencies/productDependency");
const upload = require("../middlewares/upload");

const router = express.Router();

// 관리자전체상품조회
router.get("/", adminProductController.getAllProduct);

// 관리자상품추가
router.post("/", upload.single("imageUrl"), adminProductController.postProduct);

// 관리자상품수정
router.patch("/:productId", adminProductController.patchProduct);

// 관리자상품이미지수정
router.patch(
  "/productImage/:productId",
  upload.single("imageUrl"),
  adminProductController.patchProductImage
);

// 관리자추천상품조회
router.get("/pick", adminProductController.getPickProduct);

// 관리자상품추천
router.patch("/pick/:productId", adminProductController.pickProduct);

module.exports = router;
