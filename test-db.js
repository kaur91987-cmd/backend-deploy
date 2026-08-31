const { testDatabaseConnection } = require("./db");

async function run() {
    console.log("Checking MySQL database for myapp...");

    try {
        const result = await testDatabaseConnection();
        console.log("STATUS: WORKING");
        console.log(JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("STATUS: NOT WORKING");
        console.error("Database check failed:");
        console.error(error.message);
        process.exit(1);
    }
}

run();
