import express from "express";
import { Job } from "../models/Job.js";
import { requireRole } from "../middleware/auth.js";

export function createJobsRouter(auth) {
  const router = express.Router();

  router.get("/", auth, async (req, res, next) => {
    try {
      const jobs = await Job.find().sort({ createdAt: -1 }).lean();
      res.json(jobs);
    } catch (error) {
      next(error);
    }
  });

  router.post("/", auth, requireRole("recruiter", "admin"), async (req, res, next) => {
    try {
      const { title, company, location, type, salary, skills, description } = req.body;
      if (!title || !company || !location || !type || !salary || !description) {
        return res.status(400).json({ message: "Missing required job fields." });
      }

      const job = await Job.create({
        title,
        company,
        location,
        type,
        salary,
        skills: Array.isArray(skills) ? skills : [],
        description,
        recruiterId: req.user.id,
      });

      return res.status(201).json(job);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
