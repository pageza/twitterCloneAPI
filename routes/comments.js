const express = require('express')
const router = express.Router()
const { Comment, Post, User } = require('../models')

// Create comment
router.post('/create', async (req, res) => {
    const { userUuid, postUuid, commentContent} = req.body
    try {
        const user = await User.findOne({ where: { uuid: userUuid }})
        const post = await Post.findOne({ where: { uuid: postUuid }})

        const comment = await Comment.create({ commentContent, postId: post.id, userId: user.id})

        return res.json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Get all comments for a single Post
// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId
//     const
// })

module.exports = router
