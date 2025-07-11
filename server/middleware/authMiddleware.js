import User from "../models/user.js";

// middleware to check if user is authenticated

export const protect = async (req, res, next) => {
  const auth = req.auth();
  console.log("auth:", auth); // Debug log

  if (!auth || !auth.userId) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }
  const user = await User.findById(auth.userId);
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }
  req.user = user;
  next();
};
