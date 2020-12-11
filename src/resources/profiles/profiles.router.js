const router = require('express').Router()
const auth = require('../../utils/auth')
const { OK, NOT_FOUND } = require('http-status-codes')
const profilesService = require('./profiles.service')

router.route('/:username').get(auth, async (req, res) => {
  const { username } = req.params
  const currentUser = req.payload

  const user = profilesService.getUser(username, currentUser)
  if (!user) {
    res.sendStatus(NOT_FOUND)
  } else {
    res.status(OK).json(user)
  }
})

module.exports = router
