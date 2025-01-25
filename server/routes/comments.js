const express = require('express');
const {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
  likeComment
} = require('../controllers/commentController');

const { protect, authorize } = require('../middleware/auth');

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

module.exports = router; 