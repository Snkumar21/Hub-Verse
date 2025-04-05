const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snkumar30",
  database: "hubverse",
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "About.html"));
});

app.get("/cateogry", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "All Cateogry.html"));
});

app.get("/courses", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Courses.html"));
});

app.get("/forgot", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Forgot.html"));
});

app.get("/submit", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Login.html"));
});

app.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signUp.html"));
});

app.get("/review", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Review.html"));
});

app.get("/abroad", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Abroad.html"));
});

app.get("/ai", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "AI.html"));
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/signupForm", (req, res) => {
  const { ename, email, password } = req.body;

  const query = "INSERT INTO user1 (uname, uemail, upassword) VALUES (?, ?, ?)";
  db.query(query, [ename, email, password], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data into the database");
    } else {
      console.log("User data inserted successfully");
      res.redirect("/submit");
    }
  });
  db.end();
});

app.post("/LoginForm", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM user1 WHERE uemail = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).send("Error fetching data from the database");
    } else {
      if (results.length > 0 && results[0].upassword === password) {
        const userName = results[0].uname;
        res.redirect(`/cateogry?userName=${userName}`);
      } else {
        // User not found, send error message
        res.status(401).send("Invalid login credentials");
      }
    }
  });
});

app.post("/forgot", (req, res) => {
  const { email, password } = req.body;

  const query = "UPDATE user1 SET upassword = ? WHERE uemail = ?";
  db.query(query, [password, email], (err, results) => {
    if (err) {
      console.error("Error updating password:", err);
      res.status(500).send("Error updating password");
    } else {
      if (results.affectedRows > 0) {
        res.redirect("/submit");
      } else {
        res.json({ success: false, message: "User not found" });
      }
    }
  });
});

app.post("/contact", (req, res) => {
  const { fname, lname, cemail, uphone, message } = req.body;

  const query =
    "INSERT INTO contact1 (fname, lname, cemail, uphone, message) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [fname, lname, cemail, uphone, message], (err, results) => {
    if (err) {
      console.error("Error inserting data into contact1:", err);
      res.status(500).send("Error submitting message");
    } else {
      res.redirect("/index");
    }
  });
});

// Handle the form submission
app.post("/reviewForm", (req, res) => {
  const { reviewname, reviewemail, reviewText } = req.body;

  const query = "INSERT INTO review (rname, remail, rmessage) VALUES (?, ?, ?)";
  db.query(query, [reviewname, reviewemail, reviewText], (err, results) => {
    if (err) {
      console.error("Error inserting data into review:", err);
      res.status(500).send("Error submitting review");
    } else {
      res.redirect("/review");
    }
  });
});

// Handle the request to get reviews
app.get("/get_reviews", (req, res) => {
  const query = "SELECT * FROM review";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying reviews:", err);
      res.status(500).json({ error: "Error fetching reviews" });
    } else {
      res.json({ reviews: results });
    }
  });
});

app.listen(6926, () => {
  console.log("Server is running on http://localhost:6926");
});
