const User = require('../profiles/profiles.model')
const Profile = require('../profiles/profiles.model')
const { hashPassword } = require('../../utils/hashHelper')

const findByKey = (key) => {
  return User.findOne({ key })
}

const register = async ({ username, email, password }) => {
  const newUser = new Profile()
  newUser.username = username
  newUser.email = email
  newUser.password = hashPassword(password)
  await newUser.save()
  return newUser
}

module.exports = {
  findByKey,
  register,
}
