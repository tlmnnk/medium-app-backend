const jwt = require('jsonwebtoken')
const repo = require('./profiles.repo')
const { JWT_SECRET_KEY } = require('../../common/config')
const { checkHashedPassword } = require('../../utils/hashHelper')

const getUser = async (username, currentUserId) => {
  const user = await repo.findByUsername(username)
  if (user) {
    const currentUser = await repo.findUserById(currentUserId)
    return user.toResponse(currentUser)
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
  console.log(currentUser)
  const userToUpdate = await repo.findUserById(currentUser.id)
  console.log(userToUpdate)
  if (userToUpdate.isFollowing(username)) {
    return null
  }
  const updatedUser = await userToUpdate.follow(username)
  const userToFollow = await repo.findByUsername(username)
  return userToFollow.toResponse(updatedUser)
}

module.exports = {
  getUser,
  signToken,
  followUser,
}
