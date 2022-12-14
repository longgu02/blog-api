const PostDetail = require('../models/postDetail.model')

module.exports = {
  get: async (req, res) => {
    const posts = await PostDetail.find({ published: true }).populate('user')
    return res.json({ data: posts })
  },
  slugQuery: async (req, res) => {
    const posts = await PostDetail.findOne({ slug: req.params.slug }).populate('user')
    return res.json({ data: posts })
  },
  create: async (req, res) => {
    try {
      console.log(req.user);
      const newPost = new PostDetail({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
        slug: req.body.slug,
        summary: req.body.summary || '',
        published: req.body.published || false,
        createAt: Date.now(),
      })
      await newPost.save()
      return res.json({ message: 'Successfully', post: newPost })
    } catch (err) {
      return res.json({ message: 'Failed', error: err.message })
    }
  },
  edit: async (req, res) => {
    let matchPost
    try {
      matchPost = PostDetail.findById(req.params.id)
      if (!matchPost) throw { status: 500, message: 'Post not exists' }
      matchPost.title = req.body.title
      matchPost.slug = req.body.slug
      matchPost.content = req.body.content
      matchPost.summary = req.body.summary
      matchPost.published = req.body.published
      matchPost.updateAt = Date.now()
      return res.json({ message: 'Successfully', post: newPost })
    } catch (err) {
      return res.json({ message: 'Failed', error: err.message })
    }
  },
}
