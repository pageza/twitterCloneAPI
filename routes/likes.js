const express = require('express')
const router = express.Router()
const { Like } = require('../models')
const { Op } = require('sequelize')
//Create a Like
router.post('/create', async (req, res) => {
    const { postId, userId } = req.body
    try {
        const like = await Like.create({ postId, userId })
        return res.json(like)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Get ALL likes
router.get('/', async (req, res) => {
    try {
        const likes = await Like.findAll()
        return res.json(likes)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Remove a like
router.delete('/delete', async (req, res) => {
    const { postId, userId } = req.body
    try {
        const like = await Like.findOne({
            where: {
                [Op.and]: [{ postId }, { userId }]
            }
        })
        await like.destroy()
        return res.json({ message: "Unliked"})
    } catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router
