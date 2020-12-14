const auth = require('../../utils/auth')
const { StatusCodes } = require('http-status-codes')
const articlesService = require('./articles.service')
const router = require('express').Router()

router.route('/').post(auth, async (req, res) => {
  console.log('user', req.user);
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

module.exports = router
