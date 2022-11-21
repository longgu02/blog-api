const Category = require('../models/category.model')

module.exports = {
  get: async (req, res) => {
    try {
      const categories = await Category.find({})
      return res.json({ categories: categories })
    } catch (err) {
      res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  edit: async (req, res) => {

  },
  delete: async (req, res) => {
    
  }
}
