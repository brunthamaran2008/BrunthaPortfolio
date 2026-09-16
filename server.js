const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// Supabase PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get("/", (req, res) => {
    res.send("Bruntha Portfolio Backend is Running 🚀");
});

// Get projects
app.get("/api/projects", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM projects ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Save contact message
app.post("/api/messages", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await pool.query(
            "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)",
            [name, email, message]
        );

        res.json({ message: "Message saved successfully!" });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to save message" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
