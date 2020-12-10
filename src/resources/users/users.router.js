const router = require('express').Router()
const { users } = require('../../data/data')

router.route('/').get((req, res) => {
  res.status(200).json(users)
})

module.exports = router
