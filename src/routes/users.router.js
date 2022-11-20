const express = require('express')
const router = express.Router()
const { get, getDetail, edit } = require('../controllers/users')
const {
  authenticate,
  adminAuthenticate,
} = require('../middlewares/auth.middleware')

router.get('/', adminAuthenticate, get)
router.get('/profile/:id', getDetail)
router.put('/:id/edit', authenticate, edit)

module.exports = router
