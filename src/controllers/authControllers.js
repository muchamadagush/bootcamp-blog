const { Users } = require('../models')
const BuildResponse = require('../helpers/BuildResponse')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class AuthController {
    async login(req, res) {
        try {
            console.log('body', req.body)
            const { email, password } = req.body

            // cek apakah user tersedia dan statusnya aktif
            const user = await Users.findOne({ where: { email }, raw: true })
            if (!user) {
                throw new Error('User tidak ditemukan')
            } else if (user.status !== 'Active') {
                throw new Error('User ditangguhkan, silahkan hubungi administrator untuk informasi lebih lanjut')
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                throw new Error('Email atau password salah')
            }

            const payload = {
                id: user.id,
                role: user.role
            }

            const secretKey = 'qwertyuiop'
            const options = { expiresIn: '5m' }

            const token = jwt.sign(payload, secretKey, options)
            const refreshToken = jwt.sign(payload, 'asdfghjkl', { expiresIn: '15m' })
        
            
            delete user.password

            const buildResponse = BuildResponse.get({
                accessToken: token,
                refreshToken,
                expiresIn: 60000,
                tokenType: "Bearer",
                user
            })

            res.status(200).json(buildResponse)
        } catch (error) {
            res.status(500).json(error.message || 'Internal Server Error')
        }
    }

    async refreshToken(req, res) {
        try {
            const { token } = req.body

            let dataToken
            jwt.verify(token, 'asdfghjkl', (err, decoded) => {
                if (err) {
                  return res.status(401).json({ message: err.message })
                }
                dataToken = decoded
            })

            const payload = {
                id: dataToken.id,
                role: dataToken.role
            }

            const secretKey = 'qwertyuiop'
            const options = { expiresIn: '5m' }

            const newAccessToken = jwt.sign(payload, secretKey, options)
            const newRefreshToken = jwt.sign(payload, 'asdfghjkl', { expiresIn: '15m' })

            const buildResponse = BuildResponse.get({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn: 60000,
                tokenType: "Bearer",
            })

            res.status(200).json(buildResponse)
        } catch (error) {
            res.status(500).json(error.message || 'Internal Server Error')
        }
    }
}

module.exports = new AuthController()