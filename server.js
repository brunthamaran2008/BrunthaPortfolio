const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio_db"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err);
    } else {
        console.log("MySQL connected successfully!");
    }
});

app.get("/", (req, res) => {
    res.send("Bruntha Portfolio Backend is Running 🚀");
});

// Get projects from MySQL
app.get("/api/projects", (req, res) => {

    db.query("SELECT * FROM projects", (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});
app.post("/api/messages", (req, res) => {

    const { name, email, message } = req.body;

    const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to save message" });
        }

        res.json({ message: "Message saved successfully!" });
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
