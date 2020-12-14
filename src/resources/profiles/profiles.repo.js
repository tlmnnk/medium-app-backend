const User = require('./profiles.model')

const findByUsername = async (key) => {
  return await User.findOne({ username: key })
}

const findUserById = (id) => {
  return User.findById({ _id: id })
}

module.exports = {
  findByUsername,
  findUserById,
}
