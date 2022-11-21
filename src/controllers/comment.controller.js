const Comment = require('../models/comment.model')

module.exports = {
  get: async (req, res) => {
    try {
      const comments = await Comment.find({})
      return res.json({ status: 'Successfully', comments: comments })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  edit: async (req, res) => {

  },
  delete: async (req, res) => {
    
  }
}
