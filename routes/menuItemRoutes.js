const express = require("express");

const router = express.Router();

const {
  addMenuItem,
  getAllMenuItems,
  getFilteredMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
} = require("../controllers/menuItems.controller");

router.use(express.json());

// GET /api/menu - Retrieve all menu items with optional filters
router.get("/menu", getFilteredMenuItems);

// GET /api/menu/search - Full-text search for menu items
router.get("/menu/search", getAllMenuItems);

// GET /api/menu/:id - Get a single menu item by ID
router.get("/menu/:id", getMenuItemById);

// POST /api/menu - Add a new menu item
router.post("/menu", addMenuItem);

// PUT /api/menu/:id - Update an existing menu item
router.put("/menu/:id", updateMenuItem);

// DELETE /api/menu/:id - Delete a menu item
router.delete("/menu/:id", deleteMenuItem);

// PATCH /api/menu/:id/toggle-availability - Toggle availability of a menu item
router.patch("/menu/:id/availability", toggleMenuItemAvailability);

module.exports = router;
