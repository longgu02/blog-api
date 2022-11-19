const jwt = require('jsonwebtoken')

module.exports = {
  authenticate: (req, res, next) => {
    jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) return res.status(403).json({ status: 'Forbidden' })
        req.user = { username: user.username }
        next()
      }
    )
  },
}
