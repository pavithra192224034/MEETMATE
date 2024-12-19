const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Ensure uploads folder exists
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); // Specify the upload folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
    }
});

// Initialize Multer
const upload = multer({ storage: storage });

// API Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.status(200).json({
            message: 'File uploaded successfully',
            filePath: `/uploads/${req.file.filename}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed' });
    }
});

// Serve the uploads folder as static for testing
app.use('/uploads', express.static(uploadFolder));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
