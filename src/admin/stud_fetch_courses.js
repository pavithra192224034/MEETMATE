const stud_fetch_courses = (req, res) => {
    // No need to validate faculty_id as we are fetching courses for all faculties

    const query = 'SELECT c.course_code, c.course_name, c.id course_id, c.image_in_text, c.Faculty_id,'+
'u.Student_name FROM create_course c inner join users u on u.user_id = c.Faculty_id';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ error: 'Failed to fetch courses' });
        }

        const courses = results.map(course => ({
            course_name: course.course_name,
            course_name: course.course_name,
            course_id: course.course_id,
            image_url: course.image_in_text 
                ? `${req.protocol}://${req.get('host')}/uploads/course_image/${course.image_in_text}`
                : null,
                faculty_name : course.Student_name,
            Faculty_id: course.Faculty_id
        }));

        res.status(200).json({
            message: 'Courses fetched successfully',
            data: courses
        });
    });
};

const db = require('../db/database');

module.exports = { stud_fetch_courses };
