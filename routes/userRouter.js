const userController = require('../controllers/userController')

const express = require('express')
const userRoutes = express.Router()


userRoutes.get('/', userController.get)

userRoutes.post('/new', userController.create)

userRoutes.get('/songs',userController.getsongs)

userRoutes.put('/edit',userController.update)

userRoutes.delete('/',userController.delete)

module.exports = userRoutes
