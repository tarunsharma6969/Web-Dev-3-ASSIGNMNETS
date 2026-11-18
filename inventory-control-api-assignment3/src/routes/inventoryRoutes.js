const express = require("express");
const controller = require("../controllers/inventoryController");

const router = express.Router();

// Specific report paths must be declared before /:id.
router.get("/low-stock", controller.lowStockReport);
router.get("/category-report", controller.categoryReport);
router.patch("/:id/stock", controller.adjustStock);

router.route("/")
  .get(controller.listItems)
  .post(controller.createItem);

router.route("/:id")
  .get(controller.getItem)
  .put(controller.updateItem)
  .delete(controller.deleteItem);

module.exports = router;
