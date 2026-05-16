const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Manish@4775",
    database: "entrance_db",
    port: 3306
});

db.connect((err) => {

    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } 
    else {
        console.log("Connected to MySQL");
    }
});

app.post("/register", (req, res) => {

    const { name, email, phone, course } = req.body;

    const sql = "INSERT INTO students(name, email, phone, course) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, phone, course], (err, result) => {

        if (err) {
            res.send("Error saving data");
        } 
        else {
            res.send("Registration Successful");
        }
    });
});

app.get("/students", (req, res) => {

    const sql = "SELECT * FROM students";

    db.query(sql, (err, result) => {

        if (err) {
            res.json([]);
        } 
        else {
            res.json(result);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});