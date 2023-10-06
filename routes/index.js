const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const authRouter = require("./authRouter");

router.get("/", (req, res) => {
  res.send("Hello api server!");
});

router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
