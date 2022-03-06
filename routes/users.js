var express = require('express');
var router = express.Router();
const { User, Follow } = require('../models')

/* Create User */
router.post('/create', async(req, res) => {
  const { fname, lname, uname, email, password, role } = req.body
  try {
    const user = await User.create({ fname, lname, uname, email, password, role })
    return res.json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
});
// Get all the users
router.get('/', async(req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (err) {
    return res.status(500).json(err)
  }
})
// Get one user
router.get('/:uuid', async(req, res) => {
  const uuid = req.params.uuid
  try {
    // This is a dirty workaround until I can figure out how to pull the followers in like posts and comments in the 'include'
    const followers = await Follow.findAll({ where: {followee_id: uuid}})
    console.log(followers)
    //
    const user = await User.findOne({
      where: { uuid },
      include: [ 'posts', 'comments']
    })
    return res.json({user, followers})
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})
router.put('/:uuid', async(req, res) => {
  const uuid = req.params.uuid
  const { fname, lname, uname, email, password, role } = req.body
  try {
    const user = await User.findOne({ where: { uuid }})
    user.fname = fname
    user.lname = lname
    user.uname = uname
    user.email = email
    user.password = password
    user.role = role

    await user.save()

    return res.json({ message: "User updated", user})
  } catch (err) {
    return res.status(500).json(err)
  }
})
router.delete('/:uuid', async(req,res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({ where: { uuid } })
    await user.destroy()
    return res.json({"message": "Used Deleted"})
  } catch (err) {
    res.status(500).json(err)
  }
} )
module.exports = router;
