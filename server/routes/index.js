const express = require("express");
const router = express.Router();

// controllers
const authController = require("../controllers/auth_controller");

// index route
router.get("/", authController.signIn);

module.exports = router;
