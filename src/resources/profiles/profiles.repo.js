const User = require('./profiles.model')

const findByUsername = (username) => {
  return User.findOne({ username })
}

module.exports = {
  findByUsername,
}
