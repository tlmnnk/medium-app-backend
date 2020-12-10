const mongoose = require('mongoose')
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
  bio: String,
  image: String,
  username: String,
  password: String,
  _id: {
    type: String,
    default: uuid,
  },
})

const userModel = mongoose.model('User', userSchema)

module.exports = {
  userModel,
}
