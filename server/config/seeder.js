const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/user');
const Service = require('../models/Service');
const Content = require('../models/Content');
const { testUsers, testServices, testContent } = require('./testData');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contentkosh', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Service.deleteMany();
    await Content.deleteMany();

    console.log('Data cleared...');

    // Hash passwords for test users
    const users = await Promise.all(
      testUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );

    // Create users
    const createdUsers = await User.create(users);
    console.log('Users imported...');

    // Add user references to content
    const contentWithUser = testContent.map(content => ({
      ...content,
      author: createdUsers.find(user => user.role === 'admin')._id
    }));

    // Create services and content
    await Service.create(testServices);
    await Content.create(contentWithUser);

    console.log('Services and content imported...');
    console.log('Data import complete!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Service.deleteMany();
    await Content.deleteMany();

    console.log('Data destroyed...');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import or -d to delete data');
  process.exit();
} 