const MenuItem = require("../models/menuItem");
const {
  createMenuItemSchema,
  updateMenuItemSchema,
  filterMenuSchema,
} = require("../validators/menuItem.validator");

// POST /api/menu - Add new menu item
const addMenuItem = async (req, res) => {
  try {
    const { error, value } = createMenuItemSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    const newMenuItem = new MenuItem(value);
    const savedMenuItem = await newMenuItem.save();

    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/menu - Filter menu items
const getFilteredMenuItems = async (req, res) => {
  try {
    const { error, value } = filterMenuSchema.validate(req.query);

    if (error) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: error.details.map((err) => err.message),
      });
    }

    const { category, isAvailable, minPrice, maxPrice } = value;

    let filter = {};
    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const menuItems = await MenuItem.find(filter);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/menu/search?q=query
const getAllMenuItems = async (req, res) => {
  try {
    const { q } = req.query;

    const menuItems = q
      ? await MenuItem.find({ $text: { $search: q } }).sort({
          score: { $meta: "textScore" },
        })
      : await MenuItem.find();

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET /api/menu/:id
const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// PUT /api/menu/:id - Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const { error, value } = updateMenuItemSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true, runValidators: true },
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// DELETE /api/menu/:id
const deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// PATCH /api/menu/:id/availability - Toggle availability status
const toggleMenuItemAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    menuItem.isAvailable = !menuItem.isAvailable;
    const updatedMenuItem = await menuItem.save();
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  addMenuItem,
  getFilteredMenuItems,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
};
