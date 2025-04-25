const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

//routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
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
