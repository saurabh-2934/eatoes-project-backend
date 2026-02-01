const express = require("express");

const routes = express.Router();

const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order.controller");
routes.use(express.json());

// Route to get all orders with pagination and status filtering
routes.get("/orders", getAllOrders);

// Route to get a single order by ID with populated menu item details
routes.get("/orders/:id", getOrderById);

// Route to create a new order
routes.post("/orders", createOrder);

// Route to update order status
routes.patch("/orders/:id/status", updateOrderStatus);

module.exports = routes;
