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
// Get a single post to display for editting
router.get('/:commentUuid', async (req, res) => {
    const uuid = req.params.commentUuid
    try {
        const comment = await Comment.findOne({ where: { uuid }})
        return res.json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Updating a single comment
router.put('/:commentUuid', async (req, res) => {
    const uuid = req.params.commentUuid
    const { commentContent } = req.body
    try {
        const comment = await Comment.findOne({ where: { uuid }})
        comment.commentContent = commentContent
        await comment.save()
        return res.json({message: "Comment updated",comment})
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Deleting a comment
router.delete('/:commentUuid', async (req, res) => {
    const uuid = req.params.commentUuid
    try {
        const comment = await Comment.findOne({ where: { uuid }})
        await comment.destroy()
        return res.json({message:"Comment Deleted"})
    } catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router
