const express = require('express')
const router = express.Router()
const { User, Follow } = require('../models')

// Create follow
router.post('/create', async (req,res) => {
    const { follower_id, followee_id } = req.body
    try {
        const follower = await User.findOne({ where: {uuid: follower_id}})
        const followee = await  User.findOne({ where: {uuid: followee_id}})
        const follow = await Follow.create({ follower_id: follower.id, followee_id: followee.id })
        return res.json(follow)
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Get all follows
router.get('/', async (req, res) => {
    try {
        const follows = await Follow.findAll()
        return res.json(follows)
    } catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router
