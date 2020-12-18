const uuid = require('uuid')
const slug = require('slug')
const mongoose = require('mongoose')
const User = require('../profiles/profiles.model')
const uniqueValidator = require('mongoose-unique-validator')

const articlesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    body: String,
    slug: { type: String, lowercase: true, unique: true },
    favoritesCount: { type: Number, default: 0 },
    tagList: [{ type: String }],
    author: { type: mongoose.Schema.Types.String, ref: 'User' },
    _id: {
      type: String,
      default: uuid,
    },
  },
  { timestamps: true }
)

articlesSchema.plugin(uniqueValidator, { message: 'is already taken' })

articlesSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify()
  }
  next()
})

articlesSchema.methods.slugify = function () {
  this.slug = `${slug(this.title)}-${(Math.random() * Math.pow(36, 6)).toString(
    36
  )}`
}

articlesSchema.methods.toResponse = function (user) {
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this.slug) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toResponse(user),
  }
}

articlesSchema.methods.updateFavoriteCount = async function () {
  const article = this
  this.favoritesCount = await User.countDocuments({
    favorites: { $in: [article.slug] },
  })

  return this.save()
}

articlesSchema.methods.updateArticle = function (article) {
  article.title && (this.title = article.title)
  article.description && (this.description = article.description)
  article.body && (this.body = article.body)
  article.tagList && (this.tagList = article.tagList)
  return this.save()
}

const Article = mongoose.model('Article', articlesSchema)

module.exports = Article
