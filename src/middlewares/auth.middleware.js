const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports = {
  authenticate: async (req, res, next) => {
    jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.status(403).json({ status: 'Forbidden' })
        const matchedUser = await User.findOne({ username: user.username })
        req.user = {
          username: user.username,
          id: matchedUser._id,
          role: matchedUser.role,
        }
        next()
      }
    )
  },
  adminAuthenticate: async (req, res, next) => {
    jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err)
          return res
            .status(403)
            .json({ status: 'Forbidden', message: err.message })
        const matchedUser = await User.findOne({ username: user.username })
        if (matchedUser.role !== 'admin')
          return res.status(403).json({ status: 'Forbidden' })
        req.user = { username: user.username }
        next()
      }
    )
  },
  staffAuthenticate: (req, res) => {
    jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.status(403).json({ status: 'Forbidden' })
        const matchedUser = await User.findOne({ username: user.username })
        if (matchedUser.role !== 'admin' && matchedUser.role !== 'staff')
          return res.status(403).json({ status: 'Forbidden' })
        req.user = { username: user.username, role: matchedUser.role }
        next()
      }
    )
  },
}
