const express = require('express')
const router = express.Router()
const {signup, getUsers, updateUsers, deleteUsers, login, getUserById} = require('../controllers/User.controller')
const auth = require('../middlewares/auth')

router.get('/', getUsers)

router.post('/crear', signup)

router.put('/', updateUsers)

router.delete('/', deleteUsers)

router.post('/login',login)

router.get('/:_id',auth,getUserById)


module.exports = router