const Article = require('./articles.model')
const repo = require('./articles.repo')

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
}
