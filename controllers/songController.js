const models = require('../models')

const songController = {}

songController.getAll = async (req, res) => {
    try {
        const songs = await models.song.findAll({
            song
        })
        res.json(songs)
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

songController.create = async (req, res) => {
    try {
        const song = await models.song.create({
            title: req.body.title,
            genre: req.body.genre
        })
        res.json({ song })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

songController.createlyric = async (req, res) => {
    try {
        let song = await models.song.findOne({
            where: {
                id: req.params.songId
            }
        })
        const lyric = await models.lyric.create({
            lyric: req.body.lyric
        })
        res.json({ song, lyric })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

songController.get = async (req,res) => {
    try {
        let song = await models.song.findOne({
            where: {
                id: req.params.songId
            }
        })
        res.json({song})
        res.status(200)
    } catch (error) {
        res.json({error})
    }
}

songController.update = async (req,res) => {

    try {
        let song = await models.song.findOne({
            where: {
                id: req.params.songId
            }
        })
        let final = await song.update(req.body)
        res.json({song, final})
    } catch (error) {
        res.json({error})
    }
}

songController.delete = async(req,res) => {
    try {
        let song = await models.song.findOne({
            where: {
                id: req.params.songId
            }
        })
        await song.destroy()
        res.json({ message: 'song deleted', song})
    } catch (error) {
        res.json({error})
    }
}


module.exports = songController
