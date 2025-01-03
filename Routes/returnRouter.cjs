const express = require("express");
const { returnBook } = require("../controller/returnController.cjs");
const router = express.Router();
router.post("/returnBook", returnBook);
module.exports = router;
