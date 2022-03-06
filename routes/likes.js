const express = require('express')
const router = express.Router()
const { Like, Post, User } = require('../models')
//Create a Like
router.post('/create', async (req, res) => {
    const { postId, userId } = req.body
    try {
        const user = await User.findOne( { where: { uuid: userId }})
        const post = await Post.findOne( { where: { uuid: postId }})
        const like = await Like.create({ postId:post.id, userId:user.id })

        return res.json(like)
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router
