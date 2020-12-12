const User = require('./profiles.model')

const findByKey = (key) => {
  return User.findOne({ key })
}

module.exports = {
  findByKey,
}
