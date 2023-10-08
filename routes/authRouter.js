const express = require("express");
const router = express.Router();
const { userController } = require("../dependencies/userDependency");

// 유저로그인
router.post("/", userController.authUser);

// 이메일 인증
router.post("/email", userController.authEmail);

module.exports = router;
