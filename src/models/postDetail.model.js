const mongoose = require('mongoose')

const postDetailSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  content: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  summary: {
    type: String,
  },
  published: {
    type: Boolean,
  },
  createAt: {
    type: Date,
  },
  updateAt: {
    type: Date,
  },
  publishedAt: {
    type: Date,
  },
})

module.exports = mongoose.model('PostDetail', postDetailSchema)
