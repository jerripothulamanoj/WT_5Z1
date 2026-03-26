const express = require('express');
const multer = require('multer');
const router = express.Router();
const File = require('../models/file');

// Multer setup (memory storage)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

// ---------------- ROUTES ----------------

// Upload file
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.originalname,
            originalname: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
            size: req.file.size
        });

        await file.save();

        res.status(201).json({
            message: "File uploaded successfully",
            fileId: file._id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Upload error" });
    }
});

// Get all files (without data)
router.get('/allfiles', async (req, res) => {
    try {
        const files = await File.find().select('-data');

        if (files.length === 0) {
            return res.status(404).json({ message: "No files found" });
        }

        res.json(files);

    } catch (error) {
        res.status(500).json({ message: "Error fetching files" });
    }
});

// Download file
router.get('/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `attachment; filename="${file.originalname}"`);
        res.send(file.data);

    } catch (error) {
        res.status(500).json({ message: "Error retrieving file" });
    }
});

// Get file metadata
router.get('/metadata/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id).select('-data');

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        res.json(file);

    } catch (error) {
        res.status(500).json({ message: "Error fetching metadata" });
    }
});

module.exports = router;