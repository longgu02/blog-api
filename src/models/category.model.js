const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  childrenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
})

module.exports = mongoose.model('Category', categorySchema)
