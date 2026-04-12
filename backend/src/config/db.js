import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

export async function connectDatabase(mongoUri, allowMemoryFallback = false) {
  try {
    await mongoose.connect(mongoUri);
    return { source: "mongodb" };
  } catch (error) {
    if (!allowMemoryFallback) {
      throw error;
    }

    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();
    await mongoose.connect(memoryUri);
    return { source: "memory" };
  }
}

export async function stopDatabase() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = undefined;
  }
}
