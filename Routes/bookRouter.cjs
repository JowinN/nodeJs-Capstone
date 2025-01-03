const express = require("express");
const { createBook, getBooks } = require("../controller/bookController.cjs");

const router = express.Router();

router.post("/create", createBook);

router.get("/", getBooks);

// router.put("/update/:id", updateBook);

module.exports = router;
