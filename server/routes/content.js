const express = require('express');
const {
  getAllContent,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  likeContent
} = require('../controllers/contentController');

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const commentRouter = require('./comments');

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

module.exports = router; 