require("dotenv").config();

const mysql = require("mysql2/promise");

const DB_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "myapp"
};

async function ensureDatabaseExists() {
    const adminConnection = await mysql.createConnection({
        host: DB_CONFIG.host,
        port: DB_CONFIG.port,
        user: DB_CONFIG.user,
        password: DB_CONFIG.password
    });

    try {
        await adminConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\``);
    } finally {
        await adminConnection.end();
    }
}

async function testDatabaseConnection() {
    await ensureDatabaseExists();

    const connection = await mysql.createConnection(DB_CONFIG);

    try {
        await connection.execute("SELECT 1 + 1 AS result");
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS app_health (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.execute("INSERT INTO app_health (name) VALUES (?)", ["db-test"]);
        const [rows] = await connection.execute("SELECT * FROM app_health ORDER BY id DESC LIMIT 1");

        return {
            success: true,
            database: DB_CONFIG.database,
            message: "Database connection successful",
            lastRow: rows[0] || null
        };
    } finally {
        await connection.end();
    }
}

module.exports = {
    DB_CONFIG,
    ensureDatabaseExists,
    testDatabaseConnection
};
