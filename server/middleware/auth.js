import User from "../models/User.js";

// Protect routes - verify user exists in our database
export const protect = async (req, res, next) => {
  try {
    const clerkId = req.headers["x-clerk-user-id"];

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - no clerk user ID",
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized",
      error: error.message,
    });
  }
};

// Authorize by role
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};