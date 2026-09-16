const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const publicProducts = require('./routes/products');
const publicCategories = require('./routes/categories');
const publicEnquiries = require('./routes/enquiries');
const publicGallery = require('./routes/gallery');
const adminRoutes = require('./routes/admin');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple request logger (helps debugging on hosted deployments)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'A1 Chairs API is running' });
});

// Public routes
app.use('/api/products', publicProducts);
app.use('/api/categories', publicCategories);
app.use('/api/enquiries', publicEnquiries);
app.use('/api/gallery', publicGallery);

// Admin routes
app.use('/api/admin', adminRoutes);

// Serve built frontend (client/dist) if present
const distDir = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distDir));

// SPA fallback for non-API routes
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});