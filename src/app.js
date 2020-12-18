const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const usersRouter = require('./resources/users/users.router')
const articlesRouter = require('./resources/articles/articles.router')
const profilesRouter = require('./resources/profiles/profiles.router')

const app = express()

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('hello world!!!')
    return
  }
  next()
})

app.use('/api', usersRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/articles', articlesRouter)

app.use((req, res) => {
  res.status(404).json('not found')
})

module.exports = app
