const models = require('../models')

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

songController.create = async (req, res) => {
    try {
        const user = await models.user.findOne({
          where: {
            id: req.headers.authorization
          }
        })
        console.log(user)
        if (user === null){
        res.status(404).json({message:'user not found'})
        return
      }
        const song = await user.createSong({
            title: req.body.title,
            genre: req.body.genre
        })
        res.json({ user, song })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

songController.createlyric = async (req, res) => {
    try {
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        const song = await models.song.findOne({
            song: req.params.id
        })
        const lyric = await models.lyric.create({
            lyric: req.body.lyric
        })
        res.json({ user, song, lyric })
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
        let song = await models.song.findOne({
            where: {
                id: req.params.id
            }
        })
        await song.destroy()
        res.json({ message: 'song deleted', song})
    } catch (error) {
        res.json({error})
    }
}


module.exports = songController
