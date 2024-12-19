const db = require('../db/database');
// API route for the home page
// POST route for admin login
const admin_login =  (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const query = "SELECT * FROM users WHERE register_number = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(200).json({
        message: "login successful",
        admin: results[0],
      });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  });
}
const create_faculty = (req,res) => {
  const { username, password , Email , register_number, Mobile_number, Address, Date_of_Birth, pincode, Gender } = req.query;
}
module.exports = { admin_login };
