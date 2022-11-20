const express = require('express')
const router = express.Router()
const { get, getDetail, register, edit } = require('../controllers/users')
const { authenticate } = require('../middlewares/auth.middleware')

router.get('/', authenticate, get)
router.get('/:id', getDetail)
router.put('/:id/edit', edit)

module.exports = router
