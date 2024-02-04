const express = require('express')

const router = express.Router()
const userController = require('../controllers/userControllers')
const Authorization = require('../middlewares/Authorization')

/**
 * @swagger
 * /v1/user:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      description: Get all user
 *      responses:
 *          200:
 *            description: Berhasil mendapatkan data
 *          404:
 *            description: Data tidak ditemukan
 */
router.get('/user', Authorization.Authorization, userController.getAll)

module.exports = router
