const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const app = express();

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snkumar30",
  database: "hubverse",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Page Routes
app.get("/index", (_, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.get("/category", (_, res) => res.sendFile(path.join(__dirname, "public", "All Category.html")));
app.get("/forgot", (_, res) => res.sendFile(path.join(__dirname, "public", "Forgot.html")));
app.get("/login", (_, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/signUp", (_, res) => res.sendFile(path.join(__dirname, "public", "signUp.html")));
app.get("/review", (_, res) => res.sendFile(path.join(__dirname, "public", "review.html")));

// POST: Sign Up Form
app.post("/signupForm", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], (err) => {
    if (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ success: false, message: "Error during signup" });
    }
    res.status(200).json({ success: true, message: "Signup successful" });
  });
});

// POST: Login Form
app.post("/LoginForm", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Login query error:", err);
      return res.status(500).json({ success: false, message: "Login failed" });
    }

    if (results.length > 0 && results[0].password === password) {
      const userName = results[0].name;
      res.status(200).json({ success: true, userName });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// POST: Forgot Password
app.post("/forgot", (req, res) => {
  const { email, password } = req.body;
  const query = "UPDATE users SET upassword = ? WHERE uemail = ?";

  db.query(query, [password, email], (err, results) => {
    if (err) {
      console.error("Password update error:", err);
      return res.status(500).send("Password update failed");
    }

    if (results.affectedRows > 0) {
      res.redirect("/login");
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

// POST: Contact Form
app.post("/contact", (req, res) => {
    const { name, email, phone, message } = req.body;

    const query = "INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)";
    db.query(query, [name, email, phone, message], (err, results) => {
        if (err) {
            console.error("Error inserting data into contact:", err);
            res.status(500).json({ success: false, message: 'Error submitting message' });
        } else {
            res.status(200).json({ success: true, message: 'Message submitted successfully' });
        }
    });
});

// POST: Review Form
app.post("/reviewForm", (req, res) => {
  const { name, email, review } = req.body;
  const query = "INSERT INTO review (name, email, message) VALUES (?, ?, ?)";

  db.query(query, [name, email, review], (err) => {
    if (err) {
      console.error("Review submission error:", err);
      return res.status(500).send("Review submission failed");
    }
    res.redirect("/review");
  });
});

// GET: All Reviews
app.get("/get_reviews", (_, res) => {
  db.query("SELECT * FROM review", (err, results) => {
    if (err) {
      console.error("Fetch review error:", err);
      return res.status(500).json({ error: "Could not fetch reviews" });
    }
    res.json({ reviews: results });
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});