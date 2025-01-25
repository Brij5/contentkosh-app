const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.ObjectId,
    ref: 'Content',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: [true, 'Please add some text'],
    maxlength: [500, 'Comment cannot be more than 500 characters']
  },
  parent: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
    default: null
  },
  likes: {
    type: Number,
    default: 0
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Reverse populate with virtuals for replies
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
  justOne: false
});

// Prevent users from submitting more than one comment per minute
commentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastComment = await this.constructor.findOne({
      user: this.user
    }).sort({ createdAt: -1 });

    if (lastComment) {
      const timeDiff = Date.now() - lastComment.createdAt.getTime();
      if (timeDiff < 60000) { // 60000ms = 1 minute
        throw new Error('Please wait 1 minute before posting another comment');
      }
    }
  }
  next();
});

module.exports = mongoose.model('Comment', commentSchema); 