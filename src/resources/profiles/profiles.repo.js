const User = require('./profiles.model')

const findByUsername = async (key) => {
  console.log('key-', key)
  return await User.findOne({ username: key })
}

module.exports = {
  findByUsername,
}
