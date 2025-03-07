import express from 'express';
import {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  likeComment
} from '../controllers/commentController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

// Public routes
router.get('/', getComments);
router.get('/:id', getComment);

// Protected routes
router.use(protect);

router.post('/', addComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.put('/:id/like', likeComment);

export default router; 