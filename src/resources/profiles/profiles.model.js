const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { JWT_SECRET_KEY } = require('../../common/config')
const uniqueValidator = require('mongoose-unique-validator')

const { hashPassword } = require('../../utils/hashHelper')

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
  following: [{ type: String }],
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
  },
  password: String,
  email: String,
  _id: {
    type: String,
    default: uuid,
  },
})

profileSchema.plugin(uniqueValidator, { message: 'is already taken' })

profileSchema.methods.toResponse = function (user) {
  return {
    username: this.username,
    bio: this.bio,
    image:
      this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this.username) : false,
  }
}

profileSchema.methods.toRegisterResponse = function (token) {
  const username = this.username
  return {
    username,
    bio: this.bio,
    email: this.email,
    image: this.image,
    token: token ? token : jwt.sign({ id: this._id, username }, JWT_SECRET_KEY),
  }
}

profileSchema.methods.updateUser = function (userInput) {
  userInput.username && (this.username = userInput.username)
  userInput.email && (this.email = userInput.email)
  userInput.image && (this.image = userInput.image)
  userInput.bio && (this.bio = userInput.bio)
  userInput.password && (this.password = hashPassword(userInput.password))
  return this.save()
}

profileSchema.methods.follow = function (username) {
  this.following.push(username)
  return this.save()
}

profileSchema.methods.unfollow = function (username) {
  this.following.remove(username)
  return this.save()
}

profileSchema.methods.isFollowing = function (username) {
  return this.following.some(
    (followId) => followId.toString() === username.toString()
  )
}

profileSchema.methods.isFavorite = function (id) {
  return this.favorites.some(
    (favoriteId) => favoriteId.toString() === id.toString()
  )
}

const Profile = mongoose.model('User', profileSchema)

module.exports = Profile
