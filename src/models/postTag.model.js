const mongoose = require('mongoose')

const postTagSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostDetail',
    required: true,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tags',
    required: true,
  },
})

module.export = mongoose.model('PostTag', postTagSchema)
