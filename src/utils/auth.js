module.exports = (req, res, next) => {
  req.payload = {
    id: '1',
  }
  return next()
}
