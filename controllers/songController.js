const models = require('../models')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()



const songController = {}

songController.getAll = async (req, res) => {
    try {
        let song = await models.song.findAll()
        res.json(song)
        res.status(200)

    } catch (error) {
    res.status(400).json({ error: error.message })
}

}

songController.getsongs = async (req,res) => {

    try {
        const id = localStorage.getItem('userId', userId)

        let user = await models.user.findOne({
            where: {
                id: id
            }
        })
        const song = await models.song.findAll({
            where: {
                userId: id
            }
        })

        console.log(user, song)
        if (user === null){
            res.status(404).json({message:'user not found'})
            return
        }

    } catch (error) {
        
        res.status(400).json({ error: error.message })

    }
}

songController.create = async (req, res) => {
    try {

        const user = await models.user.findOne({
          where: {
            id: req.body.id
          }
        })
    //     console.log(user)
    //     if (user === null){
    //     res.status(404).json({message:'user not found'})
    //     return
    //   }

    // const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)

    ////////////

    // const encryptedId = req.headers.authorization


    // const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

    // let user = await models.user.findOne({
    //     where: {
    //         id: decryptedId.userId
    //     }
    // })

    const song = await user.createSong({
        title: req.body.title,
        genre: req.body.genre
        // id: req.body.id
    })

    // console.log(encryptedId)
    // console.log(process.env)
    // console.log(jwt)

    // let res = await user.createSong(song)

    // let createSong = await models.song.findAll()


        // const userId = user
        res.json({song})
        console.log(song)
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }
}

songController.createlyric = async (req, res) => {
    try {
        // const encryptedId = req.headers.authorization.id
        //     const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        //     console.log(decryptedId.userId)

        // let user = await models.user.findOne({
        //         where: {
        //             id: decryptedId.userId
        //         }
        // })

        const user = await models.user.findOne({
            where: {
              id: req.body.id
            }
          })

        let lyric = await user.createlyric({
            lyric: req.body.lyric
        })
        // user.AddLyric(lyric)

        let song = await models.song.findOne({
            where: {
                id: req.body.idd
            }
        })
        // let final = await song.AddLyric(lyric)
        //     res.json({
        //         final
        //     })
        res.json({message: "nice", song, lyric})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

songController.getlyrics = async (req,res) => {

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


songController.get = async (req,res) => {
    try {
        let song = await models.song.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({song})
        res.status(200)
    } catch (error) {
        res.json({error})
    }
}

songController.delete = async(req,res) => {
    try {
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })

        let song = await models.song.findOne({
                where: {
                    id: req.params.id
                }
        })

        await song.destroy()
        res.json({message: 'song deleted', user, song})

        } catch (error) {
            res.json({error})
        }
}


module.exports = songController
