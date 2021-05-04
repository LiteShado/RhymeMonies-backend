const lyricController = require('../controllers/lyricController')

const express = require('express')
const lyricRoutes = express.Router()


lyricRoutes.get('/:id', lyricController.get)

lyricRoutes.post('/:id',lyricController.create)

module.exports = lyricRoutes
