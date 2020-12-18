const jwt = require('jsonwebtoken')
const repo = require('./profiles.repo')
const { JWT_SECRET_KEY } = require('../../common/config')
const { checkHashedPassword } = require('../../utils/hashHelper')

const getUser = async (username, user) => {
  const profile = await repo.findByUsername(username)
  if (profile) {
    const currentUser = user ? await repo.findUserById(user.id) : null
    return profile.toResponse(currentUser)
  }
  return null
}

const signToken = async (email, password) => {
  const user = await repo.findByKey(email)

  if (!user) {
    return null
  }
  const { password: hashedPassword } = user

  const comparison = await checkHashedPassword(password, hashedPassword)
  if (comparison) {
    const { _id, username } = user
    const token = jwt.sign({ id: _id, username }, JWT_SECRET_KEY)
    return token
  }
  return null
}

const followUser = async (username, currentUser) => {
  const [userToUpdate, userToFollow] = await Promise.all([
    repo.findUserById(currentUser.id),
    repo.findByUsername(username),
  ])

  if (userToUpdate.isFollowing(userToFollow._id)) {
    return null
  }
  const updatedUser = await userToUpdate.follow(userToFollow._id)
  return userToFollow.toResponse(updatedUser)
}

const unfollowUser = async (username, currentUser) => {
  const userToUpdate = await repo.findUserById(currentUser.id)
  if (!userToUpdate.isFollowing(username)) {
    return null
  }
  const updatedUser = await userToUpdate.unfollow(username)
  const userToFollow = await repo.findByUsername(username)
  return userToFollow.toResponse(updatedUser)
}

module.exports = {
  getUser,
  signToken,
  followUser,
  unfollowUser,
}
