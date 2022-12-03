const express = require('express')
const router = express.Router()
const {
  get,
  create,
  edit,
  slugQuery,
} = require('../controllers/post.controller')
const {
  authenticate,
  adminAuthenticate,
} = require('../middlewares/auth.middleware')


router.get('/', get)
// router.get(':id/related', get)
router.get('/:slug', slugQuery)
router.post('/create', authenticate, create)
router.put('/:id/edit', edit)

module.exports = router
