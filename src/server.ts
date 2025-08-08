import app from "./app";
import { config } from "./app/config";
import { connectDB } from "./app/config/database";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await connectDB();
    server = app.listen(config.port, () => {
      console.log(`✅ Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.log("❌ Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.log("❌ Unhandled Promise Rejection:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received");
  if (server) {
    server.close(() => {
      console.log("💀 Process terminated");
    });
  }
});
