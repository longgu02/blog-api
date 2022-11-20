const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'PostDetail',
  },
  upvote: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createAt: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('Comment', commentSchema)
