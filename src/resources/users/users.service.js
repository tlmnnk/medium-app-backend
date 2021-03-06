const jwt = require('jsonwebtoken')
const repo = require('./users.repo')
const { JWT_SECRET_KEY } = require('../../common/config')
const { checkHashedPassword } = require('../../utils/hashHelper')

const getCurrentUser = (id) => {
  return repo.getUserById(id)
}

const updateUser = async (user, userInput) => {
  const userToUpdate = await repo.getUserById(user.id)
  if (!userToUpdate) {
    return null
  }
  return userToUpdate.updateUser(userInput)
}

const register = async ({ username, email, password }) => {
  const newUser = await repo.register({ username, email, password })
  const token = jwt.sign({ id: newUser._id, username }, JWT_SECRET_KEY)
  return newUser.toRegisterResponse(token)
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
    return user.toRegisterResponse(token)
  }
  return null
}

module.exports = {
  signToken,
  register,
  getCurrentUser,
  updateUser,
}
