const multer = require("multer");

const upload = multer({
  // file upload destination folder
  dest: "./uploads/folders",
});

module.exports = upload;
