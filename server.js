const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 6926;

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

// Page Routes
app.get("/index", (_, res) => res.sendFile(path.join(__dirname, "public", "Index.html")));
app.get("/about", (_, res) => res.sendFile(path.join(__dirname, "public", "About.html")));
app.get("/cateogry", (_, res) => res.sendFile(path.join(__dirname, "public", "All Cateogry.html")));
app.get("/courses", (_, res) => res.sendFile(path.join(__dirname, "public", "Courses.html")));
app.get("/forgot", (_, res) => res.sendFile(path.join(__dirname, "public", "Forgot.html")));
app.get("/submit", (_, res) => res.sendFile(path.join(__dirname, "public", "Login.html")));
app.get("/signUp", (_, res) => res.sendFile(path.join(__dirname, "public", "signUp.html")));
app.get("/review", (_, res) => res.sendFile(path.join(__dirname, "public", "Review.html")));
app.get("/abroad", (_, res) => res.sendFile(path.join(__dirname, "public", "Abroad.html")));
app.get("/ai", (_, res) => res.sendFile(path.join(__dirname, "public", "AI.html")));

// POST: Sign Up Form
app.post("/signupForm", (req, res) => {
  const { ename, email, password } = req.body;
  const query = "INSERT INTO user1 (uname, uemail, upassword) VALUES (?, ?, ?)";

  db.query(query, [ename, email, password], (err) => {
    if (err) {
      console.error("Signup error:", err);
      return res.status(500).send("Error during signup");
    }
    res.redirect("/submit");
  });
});

// POST: Login Form
app.post("/LoginForm", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM user1 WHERE uemail = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Login query error:", err);
      return res.status(500).send("Login failed");
    }

    if (results.length > 0 && results[0].upassword === password) {
      const userName = results[0].uname;
      res.redirect(`/cateogry?userName=${userName}`);
    } else {
      res.status(401).send("Invalid login credentials");
    }
  });
});

// POST: Forgot Password
app.post("/forgot", (req, res) => {
  const { email, password } = req.body;
  const query = "UPDATE user1 SET upassword = ? WHERE uemail = ?";

  db.query(query, [password, email], (err, results) => {
    if (err) {
      console.error("Password update error:", err);
      return res.status(500).send("Password update failed");
    }

    if (results.affectedRows > 0) {
      res.redirect("/submit");
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  });
});

// POST: Contact Form
app.post("/contact", (req, res) => {
  const { fname, lname, cemail, uphone, message } = req.body;
  const query = "INSERT INTO contact1 (fname, lname, cemail, uphone, message) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [fname, lname, cemail, uphone, message], (err) => {
    if (err) {
      console.error("Contact submission error:", err);
      return res.status(500).send("Contact submission failed");
    }
    res.redirect("/index");
  });
});

// POST: Review Form
app.post("/reviewForm", (req, res) => {
  const { reviewname, reviewemail, reviewText } = req.body;
  const query = "INSERT INTO review (rname, remail, rmessage) VALUES (?, ?, ?)";

  db.query(query, [reviewname, reviewemail, reviewText], (err) => {
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
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});