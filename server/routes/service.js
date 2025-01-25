const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

// Sample services data
const sampleServices = [
  {
    title: 'Academic Writing',
    description: 'Professional academic writing services for students and researchers',
    category: 'academic',
    iconUrl: 'fa-book',
    status: 'active',
    subServices: [
      {
        title: 'Research Papers',
        description: 'High-quality research papers on any topic',
        price: 50,
        duration: '7 days'
      },
      {
        title: 'Thesis Writing',
        description: 'Comprehensive thesis writing and editing',
        price: 100,
        duration: '30 days'
      }
    ]
  },
  {
    title: 'Content Marketing',
    description: 'Strategic content marketing solutions for businesses',
    category: 'marketing',
    iconUrl: 'fa-bullhorn',
    status: 'active',
    subServices: [
      {
        title: 'Blog Posts',
        description: 'SEO-optimized blog posts and articles',
        price: 30,
        duration: '3 days'
      },
      {
        title: 'Social Media Content',
        description: 'Engaging social media content creation',
        price: 40,
        duration: '5 days'
      }
    ]
  },
  {
    title: 'Technical Writing',
    description: 'Expert technical documentation and writing services',
    category: 'non-academic',
    iconUrl: 'fa-code',
    status: 'active',
    subServices: [
      {
        title: 'API Documentation',
        description: 'Clear and comprehensive API documentation',
        price: 60,
        duration: '10 days'
      },
      {
        title: 'User Manuals',
        description: 'User-friendly product manuals and guides',
        price: 45,
        duration: '7 days'
      }
    ]
  }
];

// Route to create sample services (development only)
router.post('/sample', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ message: 'This route is only available in development' });
    }

    // Clear existing services
    await Service.deleteMany({});

    // Create new sample services
    const createdServices = await Service.create(sampleServices);

    res.status(201).json({
      message: 'Sample services created successfully',
      services: createdServices
    });
  } catch (error) {
    console.error('Error creating sample services:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const services = await Service.find({ status: 'active' })
      .sort({ order: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments({ status: 'active' });

    res.json({
      services,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalServices: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rest of the routes...

module.exports = router; 