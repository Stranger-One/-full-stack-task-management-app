require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB();

// console.log(process.env.CLIENT_URL);


app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/orders", orderRoutes);

app.listen("5000", () => {
  console.log("server is running");
});
