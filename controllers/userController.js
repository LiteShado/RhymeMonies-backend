const models = require('../models')

const userController = {}

userController.get = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where:{
                email: req.body.email
              }
        })
        if(user.password === req.body.password){
            res.json({message: 'login successful', user: user})
            // res.json({id: user.id, name: user.name})
          }else{
            res.status(401)
            res.json({error:'incorrect password'})
          }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

userController.create = async (req, res) => {
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


userController.getsongs = async (req,res) => {

    try {
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        console.log(user)
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

    try {
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
            }
        })
        console.log(user)
        if (user === null){
            res.status(404).json({message:'user not found'})
            return
        }
        res.json({user})
    } catch (error) {
        res.json({error})
    }
}


userController.update = async (req,res) => {

    try {
        let user = await models.user.findOne({
            where: {
                id: req.headers.authorization
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
        res.json({ message: 'user deleted', user})
    } catch (error) {
        res.json({error})
    }
}

module.exports = userController
