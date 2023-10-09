const express = require("express");
const router = express.Router();
const { userController } = require("../dependencies/userDependency");

// 유저로그인
router.post("/", userController.authUser);

// 이메일인증
router.post("/email", userController.authEmail);

// 임시비밀번호(현재비밀번호 임시비밀번호로 변경)
router.post("/temppwd", userController.tempPassword);

module.exports = router;
