const models = require('../models')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const userController = {}

userController.get = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                email: req.body.email
              }
        })
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

            res.json({ message: 'login successful', userId: encryptedId, user })
          } else {
            res.status(401).json({ error: 'login failed' })
          }
        } catch (error) {
          console.log(error)
          res.status(400).json({ error: 'login failed' })
        }
}

userController.create = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        let user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        res.json({
            message:"done",
            user: user,
            userId: encryptedId,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


userController.getsongs = async (req,res) => {

    try {
        // const encryptedId = req.headers.authorization
        // const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

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

        const songs = await user.getSongs()
        res.json({user, songs})
    } catch (error) {
        res.json({error})
    }
}
userController.profile = async (req,res) => {
    try{
        const id = localStorage.getItem('userId', userId)
        // const encryptedId = req.headers.authorization
        // const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        // res.json({id})
        const user = await models.user.findOne({
            where: {
                id: id
            }
        })

        console.log(id)

        res.json({
            user
        })
    }
    catch (error) {
        res.json({
            error
        })
    }
}


userController.update = async (req,res) => {

    try {
        const user = await models.user.findOne({
            where:{
                email: req.body.email
              }
        })
        let final = await user.update(req.body)
        res.json({user, final})
    } catch (error) {
        res.json({error})
    }
}

userController.delete = async(req,res) => {
    try {
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        await user.destroy()

        const songs = await user.getSongs()

        for(let i=0 ; songs.length ; i++){
            await songs[i].destroy()
        }

        const lyrics = await user.getLyrics()

        for(let i=0 ; lyrics.length ; i++){
            await length[i].destroy()
        }

        res.json({ message: 'user deleted', user, songs, lyrics})
    } catch (error) {
        res.json({error})
    }
}


userController.authCheck = async (req,res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        const user = await model.user.findOne({
        where: {
            id: decryptedId.userId
        }
    })
    res.json({user: user.id})
    } catch (error) {
        res.json({message: 'not verified'})
    }
}

module.exports = userController
