const express = require("express");
const { borrowBook } = require("../controller/borrowController.cjs");

const router = express.Router();

router.post("/borrowBook", borrowBook);

module.exports = router;
