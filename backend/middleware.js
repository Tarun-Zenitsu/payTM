const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "youser not found",
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (decode.userId) {
      req.userId = decode.userId;

      next();
    } else {
      return res.status(404).json({
        message: "unauthorized",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "unauthorized",
    });
  }
};

module.exports = {
  authMiddleware,
};
