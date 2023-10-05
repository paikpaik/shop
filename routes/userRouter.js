const express = require("express");
const router = express.Router();
const { userController } = require("../dependencies/userDependency");

// 유저회원가입
router.post("/", userController.postUser);

module.exports = router;
