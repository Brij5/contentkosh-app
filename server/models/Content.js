import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  type: {
    type: String,
    enum: ['article', 'video', 'image', 'link'],
    required: [true, 'Please specify content type']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
    default: 'no-photo.jpg'
  },
  url: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create content slug from the title
contentSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-') + 
      '-' + 
      Math.floor(Math.random() * 1000);
  }
  next();
});

// Cascade delete comments when a content is deleted
contentSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  await mongoose.model('Comment').deleteMany({ content: this._id });
  next();
});

// Reverse populate with virtuals
contentSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'content',
  justOne: false
});

// Indexing for better performance
contentSchema.index({ title: 'text', description: 'text', tags: 'text' });
contentSchema.index({ slug: 1 });
contentSchema.index({ author: 1 });
contentSchema.index({ status: 1 });

const Content = mongoose.model('Content', contentSchema);

export default Content;