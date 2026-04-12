import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Interview Scheduled", "Rejected", "Selected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
