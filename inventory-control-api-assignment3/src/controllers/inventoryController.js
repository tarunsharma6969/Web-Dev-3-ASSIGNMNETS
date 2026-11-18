const InventoryItem = require("../models/InventoryItem");

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

const createItem = asyncRoute(async (req, res) => {
  const item = await InventoryItem.create(req.body);
  res.status(201).json({ success: true, message: "Inventory item created", data: item });
});

const listItems = asyncRoute(async (req, res) => {
  const { category, search, sort = "newest" } = req.query;
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 10));
  const filter = {};

  if (category) filter.category = new RegExp(`^${escapeRegex(category)}$`, "i");
  if (search) filter.name = { $regex: escapeRegex(search), $options: "i" };

  const sortOptions = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    name_asc: { name: 1 },
    newest: { createdAt: -1 }
  };
  const sortBy = sortOptions[sort] || sortOptions.newest;

  const [items, total] = await Promise.all([
    InventoryItem.find(filter).sort(sortBy).skip((page - 1) * limit).limit(limit),
    InventoryItem.countDocuments(filter)
  ]);

  res.json({
    success: true,
    data: items,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) }
  });
});

const getItem = asyncRoute(async (req, res) => {
  const item = await InventoryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Inventory item not found" });
  res.json({ success: true, data: item });
});

const updateItem = asyncRoute(async (req, res) => {
  const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true, context: "query"
  });
  if (!item) return res.status(404).json({ success: false, message: "Inventory item not found" });
  res.json({ success: true, message: "Inventory item updated", data: item });
});

const deleteItem = asyncRoute(async (req, res) => {
  const item = await InventoryItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: "Inventory item not found" });
  res.json({ success: true, message: "Inventory item deleted", data: item });
});

const lowStockReport = asyncRoute(async (req, res) => {
  const items = await InventoryItem.find({
    $expr: { $lte: ["$quantity", "$reorderLevel"] }
  }).sort({ quantity: 1, name: 1 });
  res.json({ success: true, count: items.length, data: items });
});

const categoryReport = asyncRoute(async (req, res) => {
  const report = await InventoryItem.aggregate([
    {
      $group: {
        _id: "$category",
        productCount: { $sum: 1 },
        unitsInStock: { $sum: "$quantity" },
        inventoryWorth: { $sum: { $multiply: ["$price", "$quantity"] } },
        averagePrice: { $avg: "$price" }
      }
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0, category: "$_id", productCount: 1, unitsInStock: 1,
        inventoryWorth: { $round: ["$inventoryWorth", 2] },
        averagePrice: { $round: ["$averagePrice", 2] }
      }
    }
  ]);
  res.json({ success: true, data: report });
});

const adjustStock = asyncRoute(async (req, res) => {
  const change = Number(req.body.change);
  if (!Number.isInteger(change) || change === 0) {
    return res.status(400).json({ success: false, message: "change must be a non-zero whole number" });
  }

  // Atomic update prevents two simultaneous requests from making stock negative.
  const condition = change < 0 ? { quantity: { $gte: Math.abs(change) } } : {};
  const item = await InventoryItem.findOneAndUpdate(
    { _id: req.params.id, ...condition },
    { $inc: { quantity: change } },
    { new: true, runValidators: true }
  );

  if (!item) {
    const exists = await InventoryItem.exists({ _id: req.params.id });
    return res.status(exists ? 409 : 404).json({
      success: false,
      message: exists ? "Insufficient stock for this adjustment" : "Inventory item not found"
    });
  }
  res.json({ success: true, message: "Stock adjusted", data: item });
});

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = {
  createItem, listItems, getItem, updateItem, deleteItem,
  lowStockReport, categoryReport, adjustStock
};
