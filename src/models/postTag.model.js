const mongoose = require('mongoose')

const postTagSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostDetail',
    required: true,
  },
  tagId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tags',
    required: true,
  },
})

module.export = mongoose.model('PostTag', postTagSchema)
