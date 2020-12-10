const express = require('express')
const helmet = require('helmet')

const userRouter = require('./resources/users/users.router')

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

app.use('/users', userRouter)

app.listen(3000, () => {
  console.log('App is runnin on', 3000, 'port')
})

app.use((req, res) => {
  res.status(404).json('not found')
})
