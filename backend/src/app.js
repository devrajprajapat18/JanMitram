import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createAuthRouter } from "./routes/auth.routes.js";
import { createJobsRouter } from "./routes/jobs.routes.js";
import { createApplicationsRouter } from "./routes/applications.routes.js";
import { createAnalyticsRouter } from "./routes/analytics.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import { requireAuth } from "./middleware/auth.js";

function parseAllowedOrigins(clientOrigin) {
  if (!clientOrigin) {
    return [];
  }

  return clientOrigin
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function createApp({ jwtSecret, clientOrigin }) {
  const app = express();
  const allowedOrigins = parseAllowedOrigins(clientOrigin);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.options("*", cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  app.use(morgan("dev"));
  app.use(express.json());

  const auth = requireAuth(jwtSecret);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/auth", createAuthRouter(jwtSecret));
  app.use("/api/jobs", createJobsRouter(auth));
  app.use("/api/applications", createApplicationsRouter(auth));
  app.use("/api/analytics", createAnalyticsRouter(auth));

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
