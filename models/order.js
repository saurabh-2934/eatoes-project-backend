const mongoose = require("mongoose");

/* ---------------- Order Item Schema ---------------- */
const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

/* ---------------- Order Schema ---------------- */
const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    tableNumber: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

/* ---------------- Auto-generate orderNumber ---------------- */
orderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`;
  }
});

module.exports = mongoose.model("Order", orderSchema);
