const { Op } = require('sequelize')
const { Users, Files } = require('../models')
const BuildResponse = require('../helpers/BuildResponse')
const { SendEmail } = require('../helpers/SendEmail')

class UserController {
    async getAll(req, res) {
        try {
            const { page, pageSize, fullName } = req.query

            const offset = Number((page - 1) * pageSize) || 0
            const limit = Number(pageSize) || 10

            let whereParams = {}
            if (fullName) {
                whereParams = {
                    fullName: { [Op.like]: `%${fullName}%` }
                }
            }

            const users = await Users.findAll({
                limit,
                offset,
                where: whereParams,
                include: {
                    model: Files
                }
            })

            const total = await Users.count({
                where: whereParams
            })

            SendEmail()

            const buildResponse = BuildResponse.get({ data: users, count: total })

            res.status(200).json(buildResponse)
        } catch (error) {
            res.status(500).json(error.message || 'Internal Server Error')
        }
    }
}

module.exports = new UserController()