const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../middlewares/loginAdmin");
const { loginAccess } = require("../middlewares/loginAccess");
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");
const adminProductRouter = require("./adminProductRouter");

router.get("/", (req, res) => {
  res.send("Hello api server!");
});

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/admin/product", loginAccess, loginAdmin, adminProductRouter);

module.exports = router;
