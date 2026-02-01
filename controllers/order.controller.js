const Order = require("../models/order");
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../validators/order.validator");

// GET /api/orders - Get all orders with pagination and status filtering
const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .populate({
        path: "items.menuItem",
        select: "name", // 👈 only menu name
      })
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      orders,
      totalPages: Math.ceil(totalOrders / limitNumber),
      currentPage: pageNumber,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//GET /api/orders/:id - Get single order with populated menu item details
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: "items.menuItem",
      select: "name",
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// POST /api/orders - Create new order
const createOrder = async (req, res) => {
  try {
    const { error, value } = createOrderSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    const newOrder = new Order(value);
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//PATCH /api/orders/:id/status - Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { error, value } = updateOrderStatusSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Invalid status value",
        error: error.details[0].message,
      });
    }

    const { status } = value;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
};
