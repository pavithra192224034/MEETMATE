const fetch_courses = (req, res) => {
    const faculty_id=req.query.faculty_id;

    if ( !faculty_id) {
        return res.status(400).json({ message: 'All fields  are required' });
    }

    const query = 'SELECT  course_name, course_code, image_in_text, Faculty_id FROM create_course where Faculty_id='+faculty_id;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ error: 'Failed to fetch courses' });
        }
        const courses = results.map(course => ({
            course_name: course.course_name,
            course_code: course.course_code,
            image_url: course.image_in_text 
                ? `${req.protocol}://${req.get('host')}/uploads/course_image/${course.image_in_text}`
                : null,
            Faculty_id: course.Faculty_id
        }));

        res.status(200).json({
            message: 'Courses fetched successfully',
            data: courses
        });
    });
};

const db = require('../db/database');


module.exports = {  fetch_courses };
