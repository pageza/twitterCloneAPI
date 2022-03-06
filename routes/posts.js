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
// Get all posts with comments and user
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({ include: ['user','comments', 'likes']})
        return res.json(posts)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Get one post by uuid with comments and user
router.get('/:uuid', async (req,res) => {
    const uuid = req.params.uuid
    try {
        const post = await Post.findOne({ where: { uuid }, include: ['user', 'comments', 'likes']})
        return res.json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Update a post
router.put('/:uuid', async(req,res) => {
    const uuid = req.params.uuid
    const { postTitle, postContent, postImage} = req.body
    try {
        const post = await Post.findOne({ where: { uuid }})
        post.postTitle = postTitle
        post.postContent = postContent
        post.postImage = postImage

        await post.save()
        return res.json({'message':'Post Updated', post})
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Deleting a selected post
router.delete('/:uuid', async(req,res) => {
    const uuid = req.params.uuid
    try {
        const post = await Post.findOne({ where: { uuid }})
        await post.destroy()
        return res.json({'message':'Post deleted'})
    } catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router
