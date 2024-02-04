require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const { sequelize } = require('./models')

const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// config swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Belajar Nodejs',
      vesion: '1.0.0',
      description: 'Description',
    },
  },
  apis: ['./src/routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)
swaggerSpec.components = {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/public/uploads', express.static('public/uploads'))
app.use('/v1', userRoutes)
app.use('/v1', authRoutes)
app.use('/v1', uploadRoutes)

// sync sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.info('Database synced successfully')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
