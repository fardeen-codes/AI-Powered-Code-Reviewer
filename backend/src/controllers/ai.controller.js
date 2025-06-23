const aiService = require("../services/ai.service");

module.exports.getResponse = async (req, res) => {
    try {
        const code = req.body.code?.trim(); // Trim to remove extra spaces
        if (!code) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Ensure aiService.getResponse is a function before calling it
        if (typeof aiService.getResponse !== "function") {
            throw new Error("aiService.getResponse is not a function. Check ai.service.js exports.");
        }

        const response = await aiService.getResponse(code);
        res.json({ response });
    } catch (error) {
        console.error("Error in getResponse:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};
