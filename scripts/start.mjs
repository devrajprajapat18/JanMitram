import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(rootDir, "..");

function startProcess(command, args, label, options = {}) {
  const child = spawn(command, args, {
    stdio: "inherit",
    ...options,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}`);
      process.exitCode = code;
    }
  });

  return child;
}

const nodeCommand = process.execPath;

const backend = startProcess(
  nodeCommand,
  [path.join(projectRoot, "backend", "src", "server.js")],
  "backend",
  { cwd: path.join(projectRoot, "backend") },
);
const frontend = startProcess(
  nodeCommand,
  [path.join(projectRoot, "node_modules", "vite", "bin", "vite.js")],
  "frontend",
  { cwd: projectRoot },
);

function shutdown() {
  backend.kill();
  frontend.kill();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
