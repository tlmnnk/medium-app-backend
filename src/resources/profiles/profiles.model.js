const mongoose = require('mongoose')
const uuid = require('uuid')

const profileSchema = new mongoose.Schema({
  bio: String,
  image: String,
  username: String,
  password: String,
  _id: {
    type: String,
    default: uuid,
  },
})

const profileModel = mongoose.model('Profile', profileSchema)

module.exports = {
  profileModel,
}
