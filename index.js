require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend API is running"
    });
});

app.get("/api/users", (req, res) => {
    res.json({
        success: true,
        users: [
            {
                id: 1,
                name: "Harpreet"
            },
            {
                id: 2,
                name: "John"
            }
        ]
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});