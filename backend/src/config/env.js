import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  clientOrigin:
    process.env.CLIENT_ORIGIN || "http://localhost:8080,https://jan-mitram.vercel.app",
  useMemoryDb: process.env.USE_MEMORY_DB === "true",
  adminInviteCode: process.env.ADMIN_INVITE_CODE || "",
};

if (!env.mongoUri) {
  throw new Error("MONGODB_URI is missing in environment variables.");
}

if (!env.jwtSecret) {
  throw new Error("JWT_SECRET is missing in environment variables.");
}
