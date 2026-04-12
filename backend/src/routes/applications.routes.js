import express from "express";
import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";
import { requireRole } from "../middleware/auth.js";

export function createApplicationsRouter(auth) {
  const router = express.Router();

  router.post("/", auth, requireRole("student"), async (req, res, next) => {
    try {
      const { jobId } = req.body;
      if (!jobId) {
        return res.status(400).json({ message: "jobId is required." });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found." });
      }

      const application = await Application.create({
        studentId: req.user.id,
        jobId,
      });

      return res.status(201).json(application);
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "You already applied for this job." });
      }
      next(error);
    }
  });

  router.get("/mine", auth, requireRole("student"), async (req, res, next) => {
    try {
      const applications = await Application.find({ studentId: req.user.id })
        .populate("jobId", "title company location type salary")
        .sort({ createdAt: -1 })
        .lean();

      const payload = applications.map((item) => ({
        id: item._id.toString(),
        status: item.status,
        appliedAt: item.createdAt,
        job: item.jobId,
      }));

      res.json(payload);
    } catch (error) {
      next(error);
    }
  });

  router.get("/recruiter", auth, requireRole("recruiter", "admin"), async (req, res, next) => {
    try {
      const apps = await Application.find()
        .populate("jobId", "title company recruiterId")
        .populate("studentId", "name email")
        .sort({ createdAt: -1 })
        .lean();

      const filtered = req.user.role === "admin"
        ? apps
        : apps.filter((item) => item.jobId && item.jobId.recruiterId && item.jobId.recruiterId.toString() === req.user.id);

      const payload = filtered.map((item) => ({
        id: item._id.toString(),
        status: item.status,
        appliedAt: item.createdAt,
        job: item.jobId,
        student: item.studentId,
      }));

      res.json(payload);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
