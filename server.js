
const express = require('express')
const app = express()
const axios = require('axios')

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

require('dotenv').config()

app.use(express.json())
app.use(require('cors')())

// const models = require('./models')

const morgan = require('morgan')
app.use(morgan('tiny'))

// ROUTES

app.get('/', (req, res) => {
    res.send('root')
})




const userRouter = require('./routes/userRouter')
app.use('/users', userRouter)

const songRouter = require('./routes/songRouter')
app.use('/songs', songRouter)

const lookupUser = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const decryptedId = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
            const user = await models.user.findOne({
                where: {
                    id: decryptedId.userId
                }
            })
            req.user = user
        } else {
            req.user = null
        }

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

app.use(lookupUser)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    routesReport.print()

})
