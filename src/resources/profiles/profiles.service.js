const repo = require('./profiles.repo')

const getUser = async (username, currentUser) => {
  const user = await repo.findByUsername(username)
  return currentUser ? user.toResponse(user) : user.toResponse()
}

module.exports = {
  getUser,
}
