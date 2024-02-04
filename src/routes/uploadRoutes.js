const express = require('express')

const router = express.Router()
const uploadController = require('../controllers/uploadControllers')
const { upload } = require('../middlewares/multer')

router.post('/upload', upload.single('document'), uploadController.upload)

module.exports = router
