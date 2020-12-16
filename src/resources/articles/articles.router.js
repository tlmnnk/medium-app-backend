const auth = require('../../utils/auth')
const { StatusCodes } = require('http-status-codes')
const articlesService = require('./articles.service')
const router = require('express').Router()

router.route('/').get(auth, async (req, res) => {
  const articles = await articlesService.getArticlesByQuery(req)

  if (!articles) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  } else {
    res.status(StatusCodes.OK).json(articles)
  }
})

router.route('/feed').get(auth, async (req, res) => {
  if (!req.user) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
  }

  const feed = await articlesService.getFeed(req)
  if (!feed) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
  } else {
    res.status(StatusCodes.OK).json(feed)
  }
})

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

router.route('/:article').get(auth, async (req, res) => {
  const article = await articlesService.getArticle(req)
  if (!article) {
    res.sendStatus(StatusCodes.NOT_FOUND)
  } else {
    res.status(StatusCodes.OK).json({ article })
  }
})

router.route('/:article').put(auth, async (req, res) => {
  if (!req.user) {
    res.sendStatus(StatusCodes.FORBIDDEN)
    return
  }

  const article = await articlesService.updateArticle(req)
  if (!article) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
  } else res.status(StatusCodes.OK).json({ article })
})

router.route('/:article/favorite').post(auth, async (req, res) => {
  if (!req.user) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const article = await articlesService.favorite(req)
  if (!article) {
    res.sendStatus(StatusCodes.FORBIDDEN)
  } else {
    res.status(StatusCodes.OK).json(article)
  }
})

module.exports = router
