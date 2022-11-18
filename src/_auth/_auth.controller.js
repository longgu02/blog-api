const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user.model')

module.exports = {
  register: async (req, res) => {
    let passwordHash
    try {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          passwordHash = hash
        })
      })
      const newUser = new User({
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        mobile: req.body?.mobile,
        email: req.body?.email,
        passwordHash: passwordHash,
        registeredAt: Date.now(),
        role: 'reader',
      })
      await newUser.save()
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An error occured', error: err.message })
    }
    return res.status(200).json({ message: 'Successfully', user: newUser })
  },
  login: async (req, res) => {},
}
