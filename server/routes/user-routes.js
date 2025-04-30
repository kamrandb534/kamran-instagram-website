const express = require("express");

module.exports = (db, upload) => {
  const router = express.Router();

  router.post("/register", upload.none(), (req, res) => {
    const { fullname, email, password, role } = req.body;
    const safeRole = role === "creator" ? "creator" : "consumer";
    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(query, [fullname, email, password, safeRole], (err, result) => {
      if (err) return res.status(500).json({ message: "Error", error: err });
      res.json({ message: "User registered successfully", userId: result.insertId });
    });
  });
  
  
  
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const user = results[0];
      res.json({ message: "Login successful", user });
    });
  });

  return router;
};
