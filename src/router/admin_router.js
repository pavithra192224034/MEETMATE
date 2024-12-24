const express    = require('express');
const router     = express.Router();
const admin      = require('../admin/Admin');
const create_course  = require('../admin/create_course')
const create_student = require('../admin/create_student')


router.post('/login', admin.admin_login);
const faculty = require('../admin/faculty'); 

router.post('/create_faculty', faculty.create_faculty);
router.post('/create_course',create_course.create_course);
router.post('/create_student',create_student.create_student);

const { create_course2, fetch_courses } = require('../admin/fetch_courses');
const { create_course3, stud_fetch_courses} = require('../admin/stud_fetch_courses');

// router.post('/create_course', create_course);
router.get('/fetch_courses', fetch_courses);
router.get('/stud_fetch_courses', stud_fetch_courses);

module.exports = router;
