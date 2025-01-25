import express from 'express';
import { body, validationResult } from 'express-validator';
import { register, login, forgotPassword, resetPassword } from '../services/authService.js';

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    // Validation
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Login user
router.post(
  '/login',
  [
    // Validation
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await login(req.body.email, req.body.password);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Forgot password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please include a valid email')],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await forgotPassword(req.body.email);
      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Reset password
router.post(
  '/reset-password/:token',
  [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await resetPassword(req.params.token, req.body.password);
      res.json({ message: 'Password has been reset' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;