const express = require('express');
const router = express.Router();
const { getActiveServices } = require('../services/serviceService');

router.get('/', async (req, res) => {
  try {
    const services = await getActiveServices(req.query);
    console.log('Services fetched:', services); // Debug log
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
