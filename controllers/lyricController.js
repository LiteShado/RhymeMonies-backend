const models = require('../models')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()


const lyricController = {}

lyricController.create = async (req, res) => {

    try {
        const user = await models.user.findOne({
          where: {
            id: req.body.id
          }
        })
        console.log(user)

        let lyric = await user.createlyric({
            lyric: req.body.lyric
        })

        let song = await models.song.findOne({
            where: {
                id: req.body.idd
            }
        })
        // const userId = user
        res.json({  message: "nice", user, song, lyric })
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }

}

lyricController.get = async (req, res) => {
    try {
        let song = await models.song.findOne({
            where: {
                id: req.params.id
            }
        })

        let lyrics = await models.lyric.findAll()
        res.json({song, lyrics})
    } catch (error) {
        res.json({error})
    }
}


module.exports = lyricController
