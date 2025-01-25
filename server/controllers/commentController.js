const Comment = require('../models/Comment');
const Content = require('../models/Content');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all comments
// @route   GET /api/content/:contentId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    let query;

    if (req.params.contentId) {
      query = Comment.find({ content: req.params.contentId });
    } else {
      query = Comment.find();
    }

    query = query.populate({
      path: 'user',
      select: 'name'
    });

    const comments = await query;

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single comment
// @route   GET /api/comments/:id
// @access  Public
exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate({
      path: 'user',
      select: 'name'
    });

    if (!comment) {
      return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add comment
// @route   POST /api/content/:contentId/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    req.body.content = req.params.contentId;
    req.body.user = req.user.id;

    const content = await Content.findById(req.params.contentId);

    if (!content) {
      return next(new ErrorResponse(`Content not found with id of ${req.params.contentId}`, 404));
    }

    const comment = await Comment.create(req.body);

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is comment owner
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this comment`, 401));
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    comment.isEdited = true;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is comment owner
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this comment`, 401));
    }

    await comment.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Like comment
// @route   PUT /api/comments/:id/like
// @access  Private
exports.likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }

    comment.likes += 1;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment
    });
  } catch (err) {
    next(err);
  }
}; 