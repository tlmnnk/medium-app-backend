const router = require('express').Router()
const auth = require('../../utils/auth')
const { StatusCodes } = require('http-status-codes')
const profilesService = require('./profiles.service')

router.route('/:username').get(auth, async (req, res) => {
  const { username } = req.params
  const currentUser = req.user

  const user = await profilesService.getUser(username, currentUser)
  console.log('user===', user)
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
  } else {
    res.status(StatusCodes.OK).json(user)
  }
})

module.exports = router
