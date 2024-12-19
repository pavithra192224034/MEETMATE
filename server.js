const express           = require('express');
const cors              = require('cors');

const admin             = require('./src/router/admin_router');

const app               = express();

app.use(cors());

// API route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to MeetMate");
});

app.use('/uploads/course_image', express.static("./src/admin/uploads/course_image/"));


app.use('/admin',admin );

const PORT = 2000;
app.listen(PORT, ()=>{console.log(`http://localhost:${PORT}/`)});
