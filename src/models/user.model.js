const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    required: true,
  },
  lastLogin: {
    type: Date,
  },
  intro: {
    type: String,
  },
  profile: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'author', 'staff', 'reader'],
  },
})

module.exports = mongoose.model('User', userSchema)
