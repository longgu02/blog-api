const mongoose = require('mongoose')

const tagsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  metaTitle: {
    type: String,
  },
  slug: {
    type: String,
  },
})

module.exports = mongoose.model('Tag', tagsSchema)
