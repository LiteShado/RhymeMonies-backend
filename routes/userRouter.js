const userController = require('../controllers/userController')

const express = require('express')
const userRoutes = express.Router()

\
userRoutes.get('/', userController.get)

userRoutes.post('/', userController.create)

userRoutes.get('/songs',userController.getsongs)

userRoutes.put('/:id/edit',userController.update)

userRoutes.delete('/:id',userController.destroy)


module.exports = userRoutes
