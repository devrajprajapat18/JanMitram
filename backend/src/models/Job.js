import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    salary: { type: String, required: true, trim: true },
    skills: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
