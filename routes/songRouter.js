const songController = require('../controllers/songController')

const express = require('express')

const songRoutes = express.Router()

// songRoutes.get('/', songController.get)

songRoutes.get('/', songController.getAll)

songRoutes.get('/:id', songController.get)

songRoutes.get('/:id/lyrics', songController.getlyrics)

songRoutes.post('/',songController.create)

songRoutes.post('/:id/lyrics',songController.createlyric)

songRoutes.delete('/:id/',songController.delete)


module.exports = songRoutes
