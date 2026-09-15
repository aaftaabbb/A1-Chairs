const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');

// GET /api/gallery — list all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;