import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { Job } from "../models/Job.js";

export async function seedInitialData() {
  const userCount = await User.countDocuments();
  if (userCount > 0) {
    return;
  }

  const passwordHash = await bcrypt.hash("Password@123", 10);

  const [student, recruiter, admin] = await User.create([
    { name: "Demo Student", email: "student@janmitram.dev", passwordHash, role: "student" },
    { name: "Demo Recruiter", email: "recruiter@janmitram.dev", passwordHash, role: "recruiter" },
    { name: "Demo Admin", email: "admin@janmitram.dev", passwordHash, role: "admin" },
  ]);

  await Job.create([
    {
      title: "Frontend Developer Intern",
      company: "Tech Solutions Inc",
      location: "Remote",
      type: "Internship",
      salary: "$800/month",
      skills: ["React", "TypeScript", "Tailwind"],
      description: "Work on frontend modules for our SaaS platform.",
      recruiterId: recruiter._id,
    },
    {
      title: "Backend Developer",
      company: "Cloud Systems",
      location: "Hybrid",
      type: "Full-time",
      salary: "$2500/month",
      skills: ["Node.js", "MongoDB", "Express"],
      description: "Build and maintain APIs for student recruitment workflows.",
      recruiterId: recruiter._id,
    },
  ]);
}
