const router = require('express').Router()
const auth = require('../../utils/auth')
const { StatusCodes } = require('http-status-codes')
const profilesService = require('./profiles.service')

router.route('/:username').get(auth, async (req, res) => {
  const { username } = req.params
  const currentUser = req.user

  const user = profilesService.getUser(username, currentUser)
  if (!user) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  } else {
    res.status(StatusCodes.OK).json(user)
  }
})

module.exports = router
