import express from "express";
import { User } from "../models/User.js";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { requireRole } from "../middleware/auth.js";

export function createAnalyticsRouter(auth) {
  const router = express.Router();

  router.get("/summary", auth, requireRole("admin"), async (req, res, next) => {
    try {
      const [students, recruiters, jobs, applications] = await Promise.all([
        User.countDocuments({ role: "student" }),
        User.countDocuments({ role: "recruiter" }),
        Job.countDocuments(),
        Application.countDocuments(),
      ]);

      res.json({ students, recruiters, jobs, applications });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
