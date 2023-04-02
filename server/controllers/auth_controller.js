const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// user schema
const User = require("../models/user");
// JWT secret key
const JWT_SECRET = "a1py&123^%@G";

// sign up
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

// sign in
module.exports.signIn = async (req, res) => {
  try {
    // find user by username
    let user = await User.findOne({ username: req.body.username });

    // if user doesnt exists
    if (!user) {
      return res.status(400).json({
        message: "User doesnt exists",
      });
    }

    // checking if user inputed password is correct
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    // generating jwt to authorize user after login
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h", // JWT expires in 1 hour
    });

    return res.status(200).json({
      message: "User logged in",
      token,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
