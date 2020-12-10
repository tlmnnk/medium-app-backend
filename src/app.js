const express = require('express')
const helmet = require('helmet')

const profileRouter = require('./resources/profiles/profiles.router')

const app = express()

app.use(helmet())
app.use(express.json())

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('hello world!!!')
    return
  }
  next()
})

app.use('/profiles', profileRouter)

app.use((req, res) => {
  res.status(404).json('not found')
})

module.exports = app
