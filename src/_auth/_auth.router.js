const express = require('express')
const { authenticate } = require('../middlewares/auth.middleware')
const router = express.Router()
const {
  register,
  login,
  refresh,
  changePassword,
  getUser,
} = require('./_auth.controller')

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/password/edit', authenticate, changePassword)
router.get('/get-user', getUser)

module.exports = router
