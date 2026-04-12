import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { signAuthToken } from "../utils/token.js";

export function createAuthRouter(jwtSecret) {
  const router = express.Router();

  router.post("/signup", async (req, res, next) => {
    try {
      const { name, email, password, role, inviteCode } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "name, email, password and role are required." });
      }

      if (!["student", "recruiter", "admin"].includes(role)) {
        return res.status(400).json({ message: "Invalid role." });
      }

      if (role === "admin" && inviteCode !== process.env.ADMIN_INVITE_CODE) {
        return res.status(403).json({ message: "Admin signup is restricted." });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ message: "Email is already registered." });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, passwordHash, role });
      const token = signAuthToken(user, jwtSecret);

      return res.status(201).json({
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      next(error);
    }
  });

  router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "email and password are required." });
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const token = signAuthToken(user, jwtSecret);
      return res.json({
        token,
        user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
