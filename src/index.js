const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const { sequelize } = require('./models')
const app = express()
const port = 3000

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1', userRoutes)

// sync sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    console.info('Database synced successfully')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})