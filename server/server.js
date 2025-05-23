const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // React default port
  "http://localhost:5173", // Vite default port
  process.env.CLIENT_URL, // Production client URL
].filter(Boolean); // Remove any undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

app.use(express.json());

const _dbURI = "mongodb://localhost:27017/milky-way";

mongoose.connect(_dbURI).then(() => {
  console.log("Connected");
});

app.listen(3001, () => console.log("Listening to post 3001"));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
