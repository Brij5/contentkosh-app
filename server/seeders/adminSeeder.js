import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

const createAdminUser = async () => {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      // Create admin user
      await User.create({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@contentkosh.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@123',
        role: 'admin'
      });
      
      console.log('Admin user created successfully');
      console.log('Email:', process.env.ADMIN_EMAIL || 'admin@contentkosh.com');
      console.log('Password: Admin@123 (if not set in env)');
    } else {
      console.log('Admin user already exists');
    }
    
    // Create test user if it doesn't exist
    const testUserExists = await User.findOne({ email: 'user@example.com' });
    
    if (!testUserExists) {
      await User.create({
        name: 'Regular User',
        email: 'user@example.com',
        password: 'User@123',
        role: 'user'
      });
      
      console.log('Test user created successfully');
      console.log('Email: user@example.com');
      console.log('Password: User@123');
    } else {
      console.log('Test user already exists');
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Self-executing async function
(async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Create users
    await createAdminUser();
    
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
})();