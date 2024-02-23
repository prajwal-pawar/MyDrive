// file schema
const File = require("../models/file");
// user schema
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

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
      file,
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

// delete user files
module.exports.deleteUserFiles = async (req, res) => {
  try {
    // find file by file name
    let file = await File.findOne({ name: req.body.filename });

    console.log(file);

    // deleting file from local uploads folder
    fs.rm(
      // getting uploads folder path and deleting file
      path.join(__dirname, "../uploads/", req.userId + file.name),
      {
        recursive: true,
      },
      (err) => {
        return;
      }
    );

    // deleting file from DB
    await file.deleteOne();

    return res.status(200).json({
      message: "File deleted",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// download user file
module.exports.downloadUserFile = async (req, res) => {
  try {
    let file = await File.findById(req.params.id);

    // if user in file doesnt match user in jwt token
    // then user is unauthorized
    // user that requested file is not the user that uploaded a file
    if (file.user != req.userId) {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }

    return res.status(200).json({
      file,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
