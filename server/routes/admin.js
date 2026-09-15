const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Enquiry = require('../models/Enquiry');
const GalleryImage = require('../models/GalleryImage');
const cloudinary = require('../config/cloudinary');
const auth = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

const uploadToCloudinary = (fileBuffer, folder = 'a1chairs') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// POST /api/admin/login
router.post('/login', [
  body('username').trim().notEmpty(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Product Routes ---

// POST /api/admin/products
router.post('/products', auth, upload.array('images', 10), async (req, res) => {
  try {
    const { name, category, price, description, material, inStock, featured } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      imageUrls = await Promise.all(uploadPromises);
    }

    const product = new Product({
      name,
      category,
      price: parseFloat(price),
      images: imageUrls,
      description: description || '',
      material: material || '',
      inStock: inStock !== 'false',
      featured: featured === 'true'
    });

    await product.save();
    const populated = await product.populate('category', 'name slug');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', auth, upload.array('images', 10), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, category, price, description, material, inStock, featured, existingImages } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
    }

    let imageUrls = [];
    if (existingImages) {
      imageUrls = JSON.parse(existingImages);
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const newUrls = await Promise.all(uploadPromises);
      imageUrls = [...imageUrls, ...newUrls];
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (price) product.price = parseFloat(price);
    if (description !== undefined) product.description = description;
    if (material !== undefined) product.material = material;
    if (inStock !== undefined) product.inStock = inStock !== 'false';
    if (featured !== undefined) product.featured = featured === 'true';
    if (req.files || existingImages) product.images = imageUrls;

    await product.save();
    const populated = await product.populate('category', 'name slug');
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Category Routes ---

// POST /api/admin/categories
router.post('/categories', auth, [
  body('name').trim().notEmpty().withMessage('Category name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { name } = req.body;
    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/categories/:id
router.delete('/categories/:id', auth, async (req, res) => {
  try {
    const productsInCategory = await Product.countDocuments({ category: req.params.id });
    if (productsInCategory > 0) {
      return res.status(400).json({
        message: `Cannot delete category. ${productsInCategory} product(s) still use it.`
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Gallery Routes ---

// POST /api/admin/gallery
router.post('/gallery', auth, upload.single('image'), [
  body('caption').optional().trim()
], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer, 'a1chairs/gallery');

    const galleryImage = new GalleryImage({
      imageUrl,
      caption: req.body.caption || ''
    });

    await galleryImage.save();
    res.status(201).json(galleryImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/admin/gallery/:id
router.delete('/gallery/:id', auth, async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Enquiry Routes ---

// GET /api/admin/enquiries
router.get('/enquiries', auth, async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/admin/enquiries/:id
router.put('/enquiries/:id', auth, [
  body('status').isIn(['new', 'contacted', 'closed']).withMessage('Invalid status')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// --- Dashboard Stats ---

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', auth, async (req, res) => {
  try {
    const [totalProducts, totalEnquiries, newEnquiries, totalCategories] = await Promise.all([
      Product.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Category.countDocuments()
    ]);

    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalProducts,
      totalEnquiries,
      newEnquiries,
      totalCategories,
      recentEnquiries
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;