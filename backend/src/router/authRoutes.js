const express = require('express')
const router = express.Router()
const authController = require('../middleware/authMiddleware')

router.get('/login', authController.login)

router.post('/login', authController.login)