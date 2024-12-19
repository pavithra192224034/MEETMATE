const db = require('../db/database');
const uuid = require('uuid');
// POST route for creating a student
const create_student = (req, res) => {
    const {
      username,
      password,
      name,
      mobile,
      address,
      email,
      dob,
      pincode,
      gender,
     
    } = req.query;
  
    // Check if all required fields are provided
    if (!username || !password || !name || !mobile || !address || !email || !dob || !pincode || !gender ) {
      return res.status(400).json({ message: "All fields are required", Q: req.query });
    }
  
    const user_type = 100; // Assuming 102 represents students
  
    const query =
      "INSERT INTO users (register_number, password, Student_name, Mobile_contact, Email, Address, pincode, Date_of_birth, Gender, User_type) " +
      "VALUES (?,?,?,?,?,?,?,?,?,?)";
  
    db.query(
      query,
      [
        username,
        password,
        name,
        mobile,
        email,
        address,
        pincode,
        dob,
        gender,
        user_type,
        
      ],
      (err, results) => {
        if (err) {
          // Handle unique constraint errors (e.g., duplicate username)
          if (err.errno == 1062) {
            return res.status(400).json({ message: "User Name Already Exists" });
          }
          console.error("Database query error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        return res.status(201).json({
          message: "Student created successfully",
          studentId: results.insertId,
        });
      }
    );
  };
  
  module.exports = { create_student };
  