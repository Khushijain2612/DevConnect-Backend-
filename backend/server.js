const express = require("express");
const dotenv = require("dotenv");
const connectDB= require("./config/db.js");
const authRoutes= require("./routes/authRoutes.js");
const cors= require("cors");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes.js");

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
app.use("/api/posts", postRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});
const cors = require("cors");

app.use(cors({
  origin: "*"
}));