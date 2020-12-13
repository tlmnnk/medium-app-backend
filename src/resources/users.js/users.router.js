const router = require('express').Router()
const { StatusCodes } = require('http-status-codes')
const usersService = require('./users.service')

// route - '/users'

router.route('/').post((req, res) => {
  const { username, email, password } = req.body.user

  const user = usersService.register({ username, email, password })
  // TODO:
  // finish route
})

router.route('/login').post(async (req, res) => {
  const { email, password } = req.body

  const user = await usersService.signToken(email, password)
  if (!user) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ errors: 'Wrong email or password' })
  } else {
    res.status(StatusCodes.OK).json({ user })
  }
})
