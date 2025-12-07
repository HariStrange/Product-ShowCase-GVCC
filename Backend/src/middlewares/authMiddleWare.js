const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.authMiddleWare = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Unauthorized: No Token Provided",
      timestamp: new Date().toLocaleTimeString(),
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden Admin Only",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired token",
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};
