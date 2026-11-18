const express = require("express");
const inventoryRoutes = require("./routes/inventoryRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandlers");

const app = express();
app.use(express.json({ limit: "20kb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Control API is online",
    endpoints: {
      items: "/api/items",
      lowStock: "/api/items/low-stock",
      categoryReport: "/api/items/category-report"
    }
  });
});

app.use("/api/items", inventoryRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
