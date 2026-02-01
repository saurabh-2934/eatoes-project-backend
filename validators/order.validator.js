const Joi = require("joi");

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        menuItem: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
      }),
    )
    .min(1)
    .required(),

  totalAmount: Joi.number().positive().required(),

  customerName: Joi.string().min(2).max(100).required(),

  tableNumber: Joi.number().integer().min(1).required(),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Preparing", "Ready", "Delivered", "Cancelled")
    .required(),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};
