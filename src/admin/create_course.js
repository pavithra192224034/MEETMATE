const db = require('../db/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const courseImageDir = path.join(__dirname, 'uploads/course_image');

const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  };

ensureDirectoryExistence(courseImageDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'course_image') {
        cb(null, courseImageDir);
      } else {
        cb(new Error('Unexpected field'));
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });

// API endpoint to create a new course
const create_course = (req, res) => {

        upload.fields([{ name: 'course_image', maxCount: 1 }])(req, res, (err) => {
            if (err) {
              console.error("Multer error: ", err.message);
              return res.status(400).send({ status: 400, message: err.message });
            }
        
        const { course_name, course_code, Faculty_id } = req.body;

        // Input validation
        if (!course_name || !course_code || !Faculty_id) {
            return res.status(400).json({ message: 'All fields (course_name, course_code, image_in_text) are required' });
        }
    const course_image = req.files['course_image'] ? req.files['course_image'][0].filename : '';

    // Insert query
    const query = 'INSERT INTO create_course (course_name, course_code, image_in_text, Faculty_id) VALUES (?, ?, ?,?)';
    db.query(query, [course_name, course_code, course_image, Faculty_id], (err, result) => {
        if (err) {
            console.error('Error inserting course:', err);
            return res.status(500).json({ error: 'Failed to create course' });
        }

        res.status(201).json({
            message: 'Course created successfully',
            courseId: result.insertId,
        });
    });
})

}


module.exports = { create_course}
