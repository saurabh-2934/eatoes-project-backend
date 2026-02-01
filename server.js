const http = require("http");
const cors = require("cors");
require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuItemRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api", menuRoutes);
app.use("/api", orderRoutes);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
