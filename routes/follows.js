const express = require('express')
const router = express.Router()
const { Follow } = require('../models')
const { Op } = require('sequelize')

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
// Update a follow: not sure this will have a use
router.put('/:uuid', async (req, res) => {
    const { followee_id, follower_id } = req.body
    try {
        const follow = await Follow.findOne({
            where: { [Op.and]: [{ followee_id }, {follower_id}] }
        })
        follow.followee_id = followee_id
        follow.follower_id = follower_id
        await follow.save()
        return res.json({ message: "Updated Follow", follow})
    } catch (err) {
        return res.status(500).json(err)
    }
})
// Delete a follow
router.delete('/unfollow', async (req, res) => {
    const { followee_id, follower_id } = req.body
    try {
        const follow = await Follow.findOne({
            where: { [Op.and]: [{ followee_id }, {follower_id}] }
        })
        await follow.destroy()
        return res.json({ message: "Unfollowed user" })
    } catch (err) {
        return res.status(500).json(err)
    }
})
module.exports = router
