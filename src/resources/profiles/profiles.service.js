const jwt = require('jsonwebtoken')
const repo = require('./profiles.repo')
const { JWT_SECRET_KEY } = require('../../common/config')
const { checkHashedPassword } = require('../../utils/hashHelper')

const getUser = async (username, currentUser) => {
  const user = await repo.findByKey(username)
  return currentUser ? user.toResponse(currentUser) : user.toResponse()
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

module.exports = {
  getUser,
  signToken,
}
