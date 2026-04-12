import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export function requireAuth(jwtSecret) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid authorization header." });
      }

      const token = authHeader.slice("Bearer ".length);
      const payload = jwt.verify(token, jwtSecret);
      const user = await User.findById(payload.sub).select("_id name email role");

      if (!user) {
        return res.status(401).json({ message: "User not found." });
      }

      req.user = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      };
      next();
    } catch {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  };
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not allowed to access this resource." });
    }
    next();
  };
}
