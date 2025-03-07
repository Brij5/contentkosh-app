import Content from '../models/Content.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Get all content
// @route   GET /api/content
// @access  Public
export const getAllContent = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    let query = Content.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Content.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Populate
    query = query.populate({
      path: 'author',
      select: 'name email'
    });

    // Executing query
    const content = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: content.length,
      pagination,
      data: content
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single content
// @route   GET /api/content/:id
// @access  Public
export const getContent = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id).populate({
      path: 'author',
      select: 'name email'
    });

    if (!content) {
      return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    // Increment views
    content.views += 1;
    await content.save();

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new content
// @route   POST /api/content
// @access  Private
export const createContent = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.author = req.user.id;

    const content = await Content.create(req.body);

    res.status(201).json({
      success: true,
      data: content
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update content
// @route   PUT /api/content/:id
// @access  Private
export const updateContent = async (req, res, next) => {
  try {
    let content = await Content.findById(req.params.id);

    if (!content) {
      return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is content author
    if (content.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this content`, 401));
    }

    content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private
export const deleteContent = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is content author
    if (content.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this content`, 401));
    }

    // Use deleteOne() instead of deprecated remove()
    await content.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Like content
// @route   PUT /api/content/:id/like
// @access  Private
export const likeContent = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return next(new ErrorResponse(`Content not found with id of ${req.params.id}`, 404));
    }

    content.likes += 1;
    await content.save();

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (err) {
    next(err);
  }
}; 