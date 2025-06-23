require("dotenv").config(); // Load environment variables at the top

const app = require("./src/app");

const PORT = process.env.PORT || 3000; // Allow dynamic port assignment

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
