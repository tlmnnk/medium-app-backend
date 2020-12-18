const Article = require('./articles.model')
const User = require('../profiles/profiles.model')
const repo = require('./articles.repo')

const getArticlesByQuery = async (req) => {
  const { limit: limitQ, offset: offsetQ, tag } = req.query
  const findQuery = {}
  const limit = limitQ || 20
  const offset = offsetQ || 0
  if (tag) {
    findQuery.tagList = { $in: [tag] }
  }

  const result = await Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited
      ? User.findOne({ username: req.query.favorited })
      : null,
  ])
  if (result[0]) {
    findQuery.author = result[0]._id
  }
  if (result[1]) {
    findQuery.slug = { $in: result[1].favorites }
  }

  const findResult = await Promise.all([
    Article.find(findQuery)
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({ createdAt: 'desc' })
      .populate('author')
      .exec(),
    Article.countDocuments(findQuery).exec(),
    req.user ? repo.getUserById(req.user.id) : null,
  ])

  const [articles, articlesCount, user] = findResult

  return {
    articles: articles.map((article) => article.toResponse(user)),
    articlesCount,
  }
}

const getFeed = async (req) => {
  const { limit: limitQ, offset: offsetQ } = req.query
  const limit = limitQ || 20
  const offset = offsetQ || 0

  const user = await repo.getUserById(req.user.id)
  if (!user) {
    return null
  }

  const [articles, articlesCount] = await Promise.all([
    Article.find({ author: { $in: user.following } })
      .limit(Number(limit))
      .skip(Number(offset))
      .populate('author')
      .exec(),
    Article.countDocuments({ author: { $in: user.following } }),
  ])

  return {
    articles: articles.map((article) => article.toResponse(user)),
    articlesCount,
  }
}

const addArticle = async (userId, article) => {
  const newArticle = new Article(article)
  const user = await repo.getUserById(userId)
  if (!user) {
    return null
  }

  newArticle.author = user
  const artilceToSend = await newArticle.save()
  return artilceToSend.toResponse(user)
}

const getArticle = async (req) => {
  const [article, currentUser] = await Promise.all([
    repo.findBySlug(req.params.article).populate('author'),
    req.user ? repo.getUserById(req.user.id) : null,
  ])
  return article.toResponse(currentUser)
}

const updateArticle = async (req) => {
  const [currentUser, articleToUpdate] = await Promise.all([
    req.user ? repo.getUserById(req.user.id) : null,
    repo.findBySlug(req.params.article).populate('author'),
  ])
  if (req.user.id !== articleToUpdate.author._id) {
    return null
  }
  await articleToUpdate.updateArticle(req.body)
  return articleToUpdate.toResponse(currentUser)
}

const favorite = async (req) => {
  const [user, article] = await Promise.all([
    repo.getUserById(req.user.id),
    repo.findBySlug(req.params.article).populate('author'),
  ])

  await user.favorite(req.params.article)
  await article.updateFavoriteCount()
  return {
    article: article.toResponse(user),
  }
}

const unfavorite = async (req) => {
  const [user, article] = await Promise.all([
    repo.getUserById(req.user.id),
    repo.findBySlug(req.params.article).populate('author'),
  ])

  await user.unfavorite(article.slug)
  await article.updateFavoriteCount()
  return {
    article: article.toResponse(user),
  }
}

module.exports = {
  addArticle,
  getFeed,
  getArticlesByQuery,
  getArticle,
  updateArticle,
  favorite,
  unfavorite,
}
