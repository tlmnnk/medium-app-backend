const router = require('express').Router()
const { StatusCodes } = require('http-status-codes')
const auth = require('../../utils/auth')
const usersService = require('./users.service')

// route - '/users'

router.route('/user').get(auth, async (req, res) => {
  const currentUser = await usersService.getCurrentUser(req.user.id)
  if (!currentUser) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  } else {
    res.status(StatusCodes.OK).json({ user: currentUser.toRegisterResponse() })
  }
})

router.route('/user').put(auth, async (req, res) => {
  console.log('req.user', req.user)
  console.log('userInput', req.body.user)
  if (!req.user) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  } else {
    const userInput = req.body.user
    const updatedUser = await usersService.updateUser(req.user, userInput)
    res.status(StatusCodes.OK).json({ user: updatedUser.toRegisterResponse() })
  }
})

router.route('/user').post(async (req, res) => {
  const { username, email, password } = req.body.user

  const user = await usersService.register({ username, email, password })
  res.status(StatusCodes.OK).json({ user })
})

router.route('/users/login').post(async (req, res) => {
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

module.exports = router
