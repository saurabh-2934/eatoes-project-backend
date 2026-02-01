const Joi = require("joi");

// Create menu item validation
const createMenuItemSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  isAvailable: Joi.boolean().required(),
  description: Joi.string().min(5).required(),
  ingredients: Joi.array().items(Joi.string()).min(1).required(),
  preparationTime: Joi.number().positive().required(),
  imageUrl: Joi.string().uri().required(),
});

// Update menu item validation (all optional)
const updateMenuItemSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  category: Joi.string(),
  price: Joi.number().positive(),
  isAvailable: Joi.boolean(),
  description: Joi.string().min(5),
  ingredients: Joi.array().items(Joi.string()).min(1),
  preparationTime: Joi.number().positive(),
  imageUrl: Joi.string().uri(),
}).min(1); // at least one field must be present

// Query filter validation
const filterMenuSchema = Joi.object({
  category: Joi.string(),
  isAvailable: Joi.boolean(),
  minPrice: Joi.number().positive(),
  maxPrice: Joi.number().positive(),
});

module.exports = {
  createMenuItemSchema,
  updateMenuItemSchema,
  filterMenuSchema,
};
