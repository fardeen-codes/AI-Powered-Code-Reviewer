const express = require("express");
const aiRoutes = require("../src/routes/ai.routes");
const cors=require("cors")

const app = express();

// Middleware to parse JSON requests
app.use(cors(
    {
        origin: "*"
    }
))
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// AI-related routes
app.use("/ai", aiRoutes);

// Handle undefined routes
app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});



module.exports = app;
