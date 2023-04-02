const express = require("express");
const router = express.Router();
const upload = require("../configs/multer");

// controllers
const authController = require("../controllers/auth_controller");
const fileController = require("../controllers/file_controller");

// auth middleware
// const auth = require("../middlewares/auth").verifyToken;
const { verifyToken } = require("../middlewares/auth");

// index route
router.get("/", (_, res) => {
  return res.status(200).json({
    message: "MyDrive API is working",
  });
});

// signUp route
router.post("/signUp", authController.signUp);

// signIn route
router.post("/signIn", authController.signIn);

// upload route
router.post(
  "/upload",
  verifyToken, // middleware to authorize user
  upload.single("file"),
  fileController.uploadFile
);

// getUserFiles route
router.get("/getUserFiles", verifyToken, fileController.getUserFiles);

module.exports = router;
