const express = require("express");
const { createBook, getBooks , updateBook} = require("../controller/bookController.cjs");

const router = express.Router();

router.post("/create", createBook);

router.get("/", getBooks);

router.post("/update", updateBook);

module.exports = router;
