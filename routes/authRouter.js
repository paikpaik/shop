const express = require("express");
const router = express.Router();
const { userController } = require("../dependencies/userDependency");

// 유저로그인
router.post("/", userController.authUser);

module.exports = router;
