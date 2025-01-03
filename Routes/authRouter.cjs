const express = require("express");
const { registerUser, authUser, getUsers } = require("../controller/authController.cjs");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", authUser);

router.get("/getUsers", getUsers);

module.exports = router;