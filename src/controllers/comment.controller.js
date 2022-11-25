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
    try {
      const matchedComment = await Comment.findById(req.params.id)
      if (!matchedComment) throw { status: 400, message: 'No Comment found' }
      matchedComment.title = req.body.title
      matchedComment.content = req.body.content
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  delete: async (req, res) => {
    try {
      await Comment.findOneAndRemove({ _id: req.params.id }).then((user) => {
        if (!user) throw { status: 400, message: 'Comment not found' }
      })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
}
