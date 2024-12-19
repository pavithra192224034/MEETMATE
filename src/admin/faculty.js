const db = require('../db/database');
const uuid = require('uuid');
// POST route for faculty login
const faculty_login = (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "SELECT * FROM Faculty WHERE Email = ? AND Password = ? ";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      return res.status(200).json({
        message: "Faculty login successful",
        faculty: results[0],
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};

// POST route for creating a faculty
const create_faculty = (req, res) => {
  const {
    username,
    password,
    name,
    mobile,
    address,
    email,
    dob,
    pincode,
    gender
  } = req.query;

  if (!username || !password || !name || !mobile || !address || !email || !dob || !pincode || !gender) {
    return res.status(400).json({ message: "All fields are required", Q:req.query });
  }

  const user_type = 101;

  const query = 
    "INSERT INTO users (register_number, password, Student_name, Mobile_contact, Email, Address, pincode, Date_of_birth, Gender, User_type) "+
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
        gender, user_type
    ],
    (err, results) => {
      if (err) {

        if(err.errno == 1062) {
          return res.status(400).json({ message: "User Name Already Exist" });
        }
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(201).json({
        message: "Faculty created successfully",
        facultyId: results.insertId,
      });
    }
  );
};

module.exports = { faculty_login, create_faculty };
