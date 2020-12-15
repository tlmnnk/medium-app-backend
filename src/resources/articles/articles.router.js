const auth = require('../../utils/auth')
const { StatusCodes } = require('http-status-codes')
const articlesService = require('./articles.service')
const router = require('express').Router()

router.route('/').post(auth, async (req, res) => {
  if (!req.user) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  const article = await articlesService.addArticle(
    req.user.id,
    req.body.article
  )
  if (!article) {
    res.status(StatusCodes.NOT_ACCEPTABLE)
  } else {
    res.status(StatusCodes.OK).json({ article })
  }
})

router.route('/').get(auth, async (req, res) => {
  const articles = await articlesService.getArticlesByQuery(req)

  if (!articles) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  } else {
    res.status(StatusCodes.OK).json(articles)
  }
})

module.exports = router
