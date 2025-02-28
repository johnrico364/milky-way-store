const express = require("express");
const mongoose = require("mongoose");

//routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();
app.use(express.json());

// const _dbURI =
//   "mongodb+srv://johnrico:john2004@projectsystems.cg2cala.mongodb.net/information_management?retryWrites=true&w=majority&appName=ProjectSystems";

const _dbURI = "mongodb://localhost:27017/saylava";

mongoose.connect(_dbURI).then(() => {
  console.log("Connected");
});

app.listen(3001, () => console.log("Listening to post 3001"));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
