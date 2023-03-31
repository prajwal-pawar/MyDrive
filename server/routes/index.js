const express = require("express");
const router = express.Router();

// controllers
const authController = require("../controllers/auth_controller");

// index route
router.get("/", (_, res) => {
  return res.status(200).json({
    message: "MyDrive API is working",
  });
});

// signUp route
router.post("/signUp", authController.signUp);

module.exports = router;
