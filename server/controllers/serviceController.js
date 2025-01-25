const Service = require('../models/Service');

exports.getActiveServices = async (req, res) => {
  try {
    const query = req.query.status === 'active' ? { status: 'active' } : {};
    const services = await Service.find(query).lean();
    console.log('Active services:', services); // Debug log
    res.json(services);
  } catch (error) {
    console.error('Error fetching active services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

// Add other controller methods like getInactiveServices, getBySlug, etc.
