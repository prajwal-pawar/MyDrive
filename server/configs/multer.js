const multer = require("multer");

const upload = multer({
  // file upload destination folder
  dest: "./uploads/",
});

module.exports = upload;
