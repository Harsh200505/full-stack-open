const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  const passwordCorrect = user
    ? await bcrypt.compare(password || '', user.passwordHash)
    : false

  if (!user || !passwordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const token = jwt.sign(
    { username: user.username, id: user._id },
    config.SECRET,
    { expiresIn: '1h' },
  )

  return response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  })
})

module.exports = loginRouter
