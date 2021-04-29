
const express = require('express')
const app = express()
const axios = require('axios')

const rowdy = require ('rowdy-logger')
const routesReport = rowdy.begin(app)

app.use(express.json())
app.use(require('cors')())

const models = require('./models')

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

// const lyricRouter = require('./routes/lyricRouter')
// app.use('/lyrics', lyricRouter)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    routesReport.print()

})
