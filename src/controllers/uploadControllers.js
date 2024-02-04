const { Files } = require('../models')
const BuildResponse = require('../helpers/BuildResponse')

class UploadController {
    async upload(req, res) {
        try {
            const { filename, path, mimetype } = req.file

            const data = {
                type: mimetype,
                path,
                filename
            }

            const result = await Files.create(data)
            const buildResponse = BuildResponse.create({ data: { ...result.dataValues, url: `http://localhost:3000/${path}` } })

            res.status(201).json(buildResponse)
        } catch (error) {
            res.status(500).json(error.message || 'Internal Server Error')
        }
    }
}

module.exports = new UploadController()