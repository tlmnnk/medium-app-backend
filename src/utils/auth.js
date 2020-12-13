const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../common/config')

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization')

    const [type, token] = tokenString.split(' ')

    if (type !== 'Bearer') {
      res.status(401).send('Wrong auth schema')
    } else {
      try {
        const user = jwt.verify(token, JWT_SECRET_KEY)
        req.user = user
      } catch (error) {
        res.status(401).send('Unauthorized user!')
      }
      return next()
    }
  } else {
    return next()
  }
}
