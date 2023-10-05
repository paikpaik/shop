const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");

router.get("/", (req, res) => {
  res.send("Hello api server!");
});

router.use("/user", userRouter);

module.exports = router;
