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
    findQuery.author = result[0]
  }
  if (result[1]) {
    findQuery._id = { $in: result[1].favorites }
  }
  if (req.query.favorited) {
    findQuery._id = { $in: [] }
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

const addArticle = async (userId, article) => {
  const newArticle = new Article(article)
  const user = await repo.getUserById(userId)
  if (!user) {
    return null
  }

  newArticle.author = user
  const artilceToSend = await newArticle.save()
  console.log('to send ', artilceToSend)
  return artilceToSend.toResponse(user)
}

module.exports = {
  addArticle,
  getArticlesByQuery,
}
