const express = require('express')
const router = express.Router()
const { User, Post } = require('../models')

//Create post
router.post('/create', async(req,res) => {
    const { userUuid, postTitle, postContent, postImage} = req.body
    try {
        const user = await User.findOne({ where: { uuid: userUuid}})
        const post = await Post.create({postTitle, postContent, postImage, userId: user.id})

        return res.json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
})
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({ include: ['user']})
        return res.json(posts)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// TODO: finish adding CRUD routes
module.exports = router
