'use strict'
const { v4: uuid } = require('uuid')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                id: uuid(),
                fullName: 'John Doe',
                email: 'john@gmail.com',
                role: 'Super Admin',
                password: '$2a$10$v9ZEvTwaHHqVhlc3oQxbyuO/NEDkhhzPPf.pXgH1M.Vy7Jkiyr7uy',
                status: 'Active',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuid(),
                fullName: 'Jane Doe',
                email: 'jane@gmail.com',
                role: 'Creator',
                password: '$2a$10$v9ZEvTwaHHqVhlc3oQxbyuO/NEDkhhzPPf.pXgH1M.Vy7Jkiyr7uy',
                status: 'Active',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {})
    }
}