const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user.model')
const { generateAccessToken, generateRefreshToken } = require('../utils/index')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      const existedUsername = await User.findOne({
        username: req.body.username,
      })
      if (existedUsername)
        throw { status: 409, message: 'Username already exists' }

      const existedEmail = await User.findOne({ email: req.body.email })
      if (existedEmail) throw { status: 409, message: 'Email already exists' }

      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw { status: 500, message: err.message }
          const newUser = new User({
            firstName: req.body?.firstName,
            lastName: req.body?.lastName,
            mobile: req.body?.mobile,
            email: req.body?.email,
            passwordHash: hash,
            registeredAt: Date.now(),
            username: req.body.username,
            role: 'reader',
          })

          if (!newUser)
            throw { status: 400, message: 'Error occured while registering' }

          await newUser.save()
          return res
            .status(200)
            .json({ status: 'Successfully', username: newUser.username })
        })
      })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  login: async (req, res) => {
    try {
      const inputPassword = req.body.password
      const matchedUser = await User.findOne({ username: req.body.username })
      if (!matchedUser) throw { status: 401, message: 'Username not exists' }
      const matchedPassword = await bcrypt.compareSync(
        inputPassword,
        matchedUser.passwordHash
      )
      if (!matchedPassword) {
        throw { status: 401, message: 'Wrong password' }
      }
      const accessToken = generateAccessToken({
        username: matchedUser.username,
        role: matchedUser.role,
      })
      const refreshToken = generateRefreshToken({
        username: matchedUser.username,
        role: matchedUser.role,
      })
      return res.status(200).json({
        status: 'Successfully',
        jwt: accessToken,
        refreshToken: refreshToken,
      })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  refresh: async (req, res) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: err.message })
      return res.json({ jwt: generateAccessToken({ username: user.username }) })
    })
  },
  changePassword: async (req, res) => {
    try {
      const matchedUser = await User.findOne({ _id: req.user?.id })
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw { status: 500, message: err.message }
          matchedUser.passwordHash = hash
          await matchedUser.save()
          return res
            .status(200)
            .json({ status: 'Successfully', username: newUser.username })
        })
      })
    } catch (err) {
      return res
        .status(err.status || 500)
        .json({ status: 'Failed', message: err.message })
    }
  },
  getUser: async (req, res) => {
    jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.status(403).json({ status: 'JWT not accepted' })
        const matchedUser = await User.findOne({ username: user.username })
        if (!matchedUser)
          return res.status(403).json({ status: 'JWT not accepted' })
        res
          .status(200)
          .json({
            status: 'Accepted',
            user: {
              username: matchedUser.username,
              firstName: matchedUser.firstName,
              lastName: matchedUser.lastName,
            },
          })
      }
    )
  },
}
