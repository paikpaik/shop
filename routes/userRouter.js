const express = require("express");
const router = express.Router();
const { userController } = require("../dependencies/userDependency");
const { loginAccess } = require("../middlewares/loginAccess");
const upload = require("../middlewares/upload");

// 유저회원가입
router.post("/", userController.postUser);

// 유저정보조회(마이페이지)
router.get("/", loginAccess, userController.getUser);

// 유저정보수정(마이페이지)
router.patch("/", loginAccess, userController.patchUser);

// 유저계정휴면(마이페이지)
router.delete("/", loginAccess, userController.deleteUser);

// 유저비밀번호수정(마이페이지)
router.patch("/pwd", loginAccess, userController.patchPassword);

// 유저프로필사진추가
router.patch(
  "/profileImage",
  loginAccess,
  upload.single("profileImage"),
  userController.patchProfileImage
);

// 유저프로필사진삭제(기본이미지로변경)
router.delete("/profileImage", loginAccess, userController.deleteProfileImage);

module.exports = router;
