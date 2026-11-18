require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Inventory Control API running at http://localhost:${PORT}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

start();
