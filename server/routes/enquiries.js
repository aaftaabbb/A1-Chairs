const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');
const { sendEnquiryEmail } = require('../config/email');

// POST /api/enquiries — submit a new enquiry
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('message').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { name, phone, message, productInterested } = req.body;

    const enquiry = new Enquiry({
      name,
      phone,
      message: message || '',
      productInterested: productInterested || ''
    });

    await enquiry.save();

    sendEnquiryEmail(enquiry).catch(err => {
      console.error('Email notification failed:', err.message);
    });

    res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;