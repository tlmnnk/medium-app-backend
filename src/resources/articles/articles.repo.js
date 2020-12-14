const User = require('../profiles/profiles.model')

const getUserById = (userId) => {
  return User.findById(userId)
}

module.exports = {
  getUserById,
}
