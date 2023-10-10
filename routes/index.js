const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const productRouter = require("./productRouter");

router.get("/", (req, res) => {
  res.send("Hello api server!");
});

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);

module.exports = router;
