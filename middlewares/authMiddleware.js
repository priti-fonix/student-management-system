const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function isAuth(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    // Extract the token (format is "Bearer TOKEN")
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.status(401).json({ message: "Token missing" }); //
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      req.user = user;

      // Pass control to the next handler
      next();
    });
  } catch (err) {
    console.log("an error occured");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = isAuth;
