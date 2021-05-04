const models = require('../models')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()


const lyricController = {}

lyricController.create = async (req, res) => {

    try {
        const user = await models.user.findOne({
          where: {
            id: req.body.userId
          }
        })
        console.log(user)


        // let songNumber = await models.song.findOne({
        //     where: {
        //         id: req.body.songId
        //     }
        // })
        // let song = await models.song.findOne({
        //     where: {
        //         id: req.params.id
        //     }
        // })
        // let lyric = await user.createLyric({
        //     lyric: req.body.lyric
        // })

        let lyric = await models.lyric.create({
            lyric: req.body.lyric
        })

        user.addLyric(lyric)
        let song = await models.song.findOne({
            where: {
                id: req.params.id
            }
        })
        let final = await song.addLyric(lyric)
        res.json({
            final, song, user
        })
        // const userId = user
        res.json({  message: "nice", user, lyric, song })
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
