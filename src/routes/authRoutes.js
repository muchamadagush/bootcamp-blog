const express = require('express')

const router = express.Router()
const authController = require('../controllers/authControllers')

/**
 * @swagger
 * /v1/auth/login:
 *  post:
 *      description: Get all user
 *      responses:
 *          200:
 *            description: Berhasil mendapatkan data
 *          404:
 *            description: Data tidak ditemukan
 */
router.post('/auth/login', authController.login)
router.post('/auth/refresh-token', authController.refreshToken)

module.exports = router
