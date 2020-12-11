const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const uuid = require('uuid')

const profileSchema = new mongoose.Schema({
  bio: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
  },
  password: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
  },
  email: String,
  _id: {
    type: String,
    default: uuid,
  },
})

profileSchema.methods.toResponse = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image:
      this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false,
  }
}

profileSchema.methods.isFollowing = function (id) {
  return this.following.some(
    (followId) => followId.toString() === id.toString()
  )
}

profileSchema.plugin(uniqueValidator, { message: 'is already taken' })

const Profile = mongoose.model('Profile', profileSchema)

module.exports = {
  Profile,
}
