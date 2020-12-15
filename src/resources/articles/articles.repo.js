const User = require('../profiles/profiles.model')
const Article = require('./articles.model')

const getUserById = (userId) => {
  return User.findById(userId)
}

const findBySlug = (slug) => {
  return Article.findOne({ slug })
}

module.exports = {
  getUserById,
  findBySlug,
}
