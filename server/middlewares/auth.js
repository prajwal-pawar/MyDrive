/* Middlewares to check jwt token is valid or not to keep user authorized and set user
as req.user  */

const jwt = require("jsonwebtoken");
// JWT secret key
const JWT_SECRET = "a1py&123^%@G";

module.exports.verifyToken = (req, res, next) => {
  try {
    // if there is token get JWT token as bearer token from Authorization header otherwise null
    const token = req.headers.authorization?.split(" ")[1] || null;

    // if theres no token in header
    if (token == null) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }

    // verify JWT/bearer token
    const decoded = jwt.verify(token, JWT_SECRET);

    // set user in req object to use in further routes and to authorize user
    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
