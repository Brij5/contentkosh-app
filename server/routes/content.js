import express from 'express';
import {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  likeContent
} from '../controllers/contentController.js';

import { protect, authorize } from '../middleware/auth.js';

// Include other resource routers
import commentRouter from './comments.js';

const router = express.Router();

// Re-route into other resource routers
router.use('/:contentId/comments', commentRouter);

// Public routes
router.get('/', getAllContent);
router.get('/:id', getContent);

// Protected routes
router.use(protect);

router.post('/', createContent);
router.put('/:id', updateContent);
router.delete('/:id', deleteContent);
router.put('/:id/like', likeContent);

export default router; 