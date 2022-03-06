const express = require('express')
const router = express.Router()
const { Follow } = require('../models')

// Create follow
router.post('/create', async (req,res) => {
    const { follower_id, followee_id } = req.body
    try {
        // I don't think I will need these, leaving as a reminder of a possibility
        // const follower = await User.findOne({ where: {uuid: follower_id}})
        // const followee = await  User.findOne({ where: {uuid: followee_id}})
        const follow = await Follow.create({ follower_id, followee_id})
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
// Get all follows for a specific User
router.get('/:uuid', async (req, res) => {
    const followee_id = req.params.uuid
    try {
        const follows = await Follow.findAll({
            where: { followee_id },
            include: 'followers'
        })
        return res.json(follows)
    } catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router
