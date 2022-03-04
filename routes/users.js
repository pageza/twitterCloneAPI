var express = require('express');
var router = express.Router();
const { User } = require('../models')

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
    const user = await User.findOne({
      where: { uuid },
      include: 'posts'
    })
    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})
// TODO: finish creating CRUD routes
module.exports = router;
