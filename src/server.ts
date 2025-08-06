import app from "./app";
import { config } from "./app/config/config";
import { connectDB } from "./app/config/database";

let server;
async function main() {
  try {
    connectDB();
    server = app.listen(config.port, () => {
      console.log(`✅ Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
