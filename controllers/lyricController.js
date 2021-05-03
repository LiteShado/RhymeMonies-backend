lyricController.create = async (req, res) => {
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
        const lyric = await user.createLyric({
            lyric: req.body.lyric
        })
        // const userId = user
        res.json({  user, song, lyric })
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }
}

lyricController.getAll = async (req, res) => {
    try {
        let song = await models.lyric.findAll()
        res.json(song)
        res.status(200)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
