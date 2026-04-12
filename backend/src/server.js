import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { seedInitialData } from "./seed/seedData.js";

async function bootstrap() {
  const database = await connectDatabase(env.mongoUri, env.useMemoryDb);
  await seedInitialData();

  const app = createApp({ jwtSecret: env.jwtSecret, clientOrigin: env.clientOrigin });

  app.listen(env.port, () => {
    console.log(`API is running on http://localhost:${env.port} using ${database.source} database`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
