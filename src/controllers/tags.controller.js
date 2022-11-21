const Tags = required('../models/tags.model')

module.exports = {
  get: async (req, res) => {
    try {
      const tags = await Tags.find({})
      return res.json({ status: 'Successful', tags: tags })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  edit: async (req, res) => {
    try {
      const matchedTags = await Tags.findById(req.params.id)
      if (!matchedTags) throw { status: 400, message: 'No tags found' }
      matchedTags.title = req.body.title
      matchedTags.metaTitle = req.body.metaTitle
      matchedTags.slug = req.body.slug
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  delete: async (req, res) => {
    try {
      await Tags.findOneAndRemove({ _id: req.params.id }).then((user) => {
        if (!user) throw { status: 400, message: 'Tags not found' }
      })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
}
