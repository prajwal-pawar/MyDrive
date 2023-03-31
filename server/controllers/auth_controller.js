// user schema
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  try {
    // find user by username
    let user = await User.findOne({ username: req.body.username });

    // if user exists
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password before saving it into DB
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // save user in DB
    user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();

    // send response
    return res.status(200).json({
      message: "User created",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
