const express = require('express')
const router = express.Router()
const { register, login } = require('./_auth.controller')

router.post('/register', register)
router.post('/login', login)
