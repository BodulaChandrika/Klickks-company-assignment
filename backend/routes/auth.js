const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing fields" });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], function (err) {
    if (err) return res.status(400).json({ message: "User already exists" });
    res.json({ message: "✅ User registered successfully" });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Invalid password" });

    req.session.userId = user.id;
    res.json({ message: "✅ Login successful" });
  });
});

// SESSION CHECK
router.get("/me", (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });
  res.json({ message: "Authenticated", userId: req.session.userId });
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "✅ Logged out successfully" });
  });
});

module.exports = router;
