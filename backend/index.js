require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cors = require("cors")
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth",authRoutes);
app.use("/menu",menuRoutes);
app.use("/orders",orderRoutes);

connectDB()

app.listen("8000",()=> {
    console.log("server is running");
    
})