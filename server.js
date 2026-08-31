require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { DB_CONFIG, testDatabaseConnection } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is working"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const result = await testDatabaseConnection();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            database: DB_CONFIG.database,
            message: "Database test failed",
            error: error.message,
            config: {
                host: DB_CONFIG.host,
                port: DB_CONFIG.port,
                user: DB_CONFIG.user
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
    console.log(`DB target: ${DB_CONFIG.database} @ ${DB_CONFIG.host}:${DB_CONFIG.port}`);
});

