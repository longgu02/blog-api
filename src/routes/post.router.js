const express = require('express')
const router = express.Router()
const { get, create, edit } = require('../controllers/post.controller')

router.get('/', get)
router.post('/create', create)
router.put('/:id/edit', edit)

module.exports = router
