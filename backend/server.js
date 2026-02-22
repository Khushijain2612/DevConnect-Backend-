const express = require("express");
const dotenv = require("dotenv");
const connectDB= require("./config/db.js");
const authRoutes= require("./routes/authRoutes.js");
const cors= require("cors");
dotenv.config();
connectDB();
const app= express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server is running");
});
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});
app.use(express.json());
app.use("/api/auth",authRoutes);
