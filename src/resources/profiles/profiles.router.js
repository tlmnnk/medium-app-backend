const router = require('express').Router()
const auth = require('../../utils/auth')
const { StatusCodes } = require('http-status-codes')
const profilesService = require('./profiles.service')

router.route('/:username').get(auth, async (req, res) => {
  const { username } = req.params

  const user = await profilesService.getUser(username, req.user)
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
  } else {
    res.status(StatusCodes.OK).json({ profile: user })
  }
})

router.route('/:username/follow').post(auth, async (req, res) => {
  const currentUser = req.user

  if (!currentUser) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const user = await profilesService.followUser(
    req.params.username,
    currentUser
  )
  if (user) {
    res.status(StatusCodes.OK).json({ profile: user })
  } else {
    res.sendStatus(StatusCodes.BAD_REQUEST)
  }
})

router.route('/:username/unfollow').delete(auth, async (req, res) => {
  if (!req.user) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const user = await profilesService.unfollowUser(req.params.username, req.user)
  if (user) {
    res.status(StatusCodes.OK).json({ profile: user })
  } else {
    res.sendStatus(StatusCodes.BAD_REQUEST)
  }
})

module.exports = router
