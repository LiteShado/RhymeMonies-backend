const userController = require('../controllers/userController')

const express = require('express')
const userRoutes = express.Router()


userRoutes.post('/', userController.get)

userRoutes.post('/new', userController.create)

userRoutes.get('/songs',userController.getsongs)

userRoutes.get('/profile',userController.profile)

userRoutes.put('/edit',userController.update)

userRoutes.get('/authcheck', userController.authCheck)

userRoutes.delete('/delete',userController.delete)

module.exports = userRoutes
