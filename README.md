# Internship Coding Challenge – Backend (Node.js)

## Project Title

**Restaurent – Menu & Order Management Backend**

---

## Objective

Build a RESTful backend application to manage menu items and customer orders with proper validation, pagination, and database relationships.

---

## Tech Stack Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Joi** – Input validation
- **dotenv** – Environment variables
- **cors** – Cross-origin requests

---

## Features Implemented

- Menu item CRUD operations
- Order creation and status updates
- Order pagination & filtering by status
- Population of menu item names inside orders
- Input validation using Joi
- Proper error handling

---

## Project Structure

```txt
server/
├── controllers/   # Business logic
├── models/        # Mongoose schemas
├── routes/        # API routes
├── validators/    # Joi validations
├── server.js      # App entry point
├── .env           # Environment variables
└── package.json


Setup Instructions
1. Install Dependencies
npm install

2. Environment Variables (.env)
PORT=5000
MONGODB_URI=your_mongodb_connection_string

3. Run the Server
nodemon server.js

Server will start on:
http://localhost:5000

API Overview:
Menu APIs → /api/menu
Order APIs → /api/orders
```
