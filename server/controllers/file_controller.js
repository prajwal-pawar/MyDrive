const File = require("../models/file");

module.exports.uploadFile = async (req, res) => {
  try {
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
