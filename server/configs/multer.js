const multer = require("multer");
const path = require("path");

// multer configs
// diskStorage because we are saving user file on local disk storage
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "/uploads/"));
  },
  // filename
  filename: (req, file, cb) => {
    cb(null, req.userId + file.originalname);
    // so our files filename would be our_user_id and our files_name
  },
});

// export multer middleware
let upload = multer({
  storage: storage,
});

module.exports = upload;
