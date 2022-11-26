const mongoose = require('mongoose')

const postCategorySchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostDetail',
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
})

module.exports = mongoose.model('PostCategory', postCategorySchema)
