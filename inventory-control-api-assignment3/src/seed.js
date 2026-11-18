require("dotenv").config();
const mongoose = require("mongoose");
const connectDatabase = require("./config/database");
const InventoryItem = require("./models/InventoryItem");

const sampleItems = [
  ["Wireless Mouse", "ELC-MOU-101", "Electronics", 699, 18, 5, "TechSource"],
  ["Mechanical Keyboard", "ELC-KEY-102", "Electronics", 2499, 4, 6, "KeyWorld"],
  ["USB-C Hub", "ELC-HUB-103", "Electronics", 1199, 12, 4, "TechSource"],
  ["Desk Lamp", "HOM-LMP-201", "Home", 899, 7, 5, "Bright Living"],
  ["Storage Basket", "HOM-BSK-202", "Home", 349, 3, 8, "Daily Needs"],
  ["A5 Notebook", "STA-NBK-301", "Stationery", 85, 45, 15, "Paper House"],
  ["Gel Pen Set", "STA-PEN-302", "Stationery", 120, 9, 10, "WriteWell"],
  ["Water Bottle", "LIF-BTL-401", "Lifestyle", 499, 20, 6, "Hydro Co"],
  ["Travel Mug", "LIF-MUG-402", "Lifestyle", 649, 2, 5, "Hydro Co"],
  ["Yoga Mat", "FIT-MAT-501", "Fitness", 999, 11, 4, "Active Gear"],
  ["Resistance Bands", "FIT-BND-502", "Fitness", 399, 6, 5, "Active Gear"],
  ["Skipping Rope", "FIT-ROP-503", "Fitness", 299, 1, 4, "Active Gear"]
].map(([name, sku, category, price, quantity, reorderLevel, supplier]) =>
  ({ name, sku, category, price, quantity, reorderLevel, supplier })
);

async function seed() {
  try {
    await connectDatabase(process.env.MONGO_URI);
    await InventoryItem.deleteMany({});
    const inserted = await InventoryItem.insertMany(sampleItems);
    console.log(`Seed complete: ${inserted.length} inventory items added.`);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
