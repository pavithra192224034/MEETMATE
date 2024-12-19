const express = require('express');
const router = express.Router();
const faculty = require('../admin/faculty'); 

router.post('/login', faculty.faculty_login);

module.exports = router;
