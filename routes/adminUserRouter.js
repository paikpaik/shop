const express = require("express");
const { adminController } = require("../dependencies/adminDependency");

const router = express.Router();

router.get("/", adminController.getUser);

module.exports = router;
