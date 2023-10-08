const express = require("express");
const router = express.Router();
const { userController } = require("../dependencies/userDependency");
const { loginAccess } = require("../middlewares/loginAccess");

// 유저회원가입
router.post("/", userController.postUser);

// 유저정보조회(마이페이지)
router.get("/", loginAccess, userController.getUser);

// 유저정보수정(마이페이지)
router.patch("/", loginAccess, userController.patchUser);
module.exports = router;
