const express = require("express");
const aiController = require("../controllers/ai.controller");

const router = express.Router();

// Define AI response route
router.post("/review", aiController.getResponse);

// Handle 404 for undefined routes within this router
router.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = router;
