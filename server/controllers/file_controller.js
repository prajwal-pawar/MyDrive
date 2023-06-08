// file schema
const File = require("../models/file");
// user schema
const User = require("../models/user");

// upload file
module.exports.uploadFile = async (req, res) => {
  try {
    // find file by filename
    let file = await File.findOne({ name: req.file.originalname });

    // if file exists
    if (file) {
      return res.status(400).json({
        message: "File already exists",
      });
    }

    // save file in DB
    file = new File({
      path: req.file.path,
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      user: req.userId, // which user uploaded file
    });

    await file.save();

    return res.status(200).json({
      message: "File uploaded",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all files uploaded by particular user
module.exports.getUserFiles = async (req, res) => {
  try {
    // find user by user id
    // let user = await User.findOne({ _id: req.userId });
    // find file by current user which is in req
    let files = await File.find({ user: req.userId });

    return res.status(200).json({
      files,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
