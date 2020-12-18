const { connectToDB } = require('./db')
const app = require('./app')
const { PORT } = require('./common/config')

connectToDB(() => {
  app.listen(PORT || 80, () => {
    console.log('Server is running!')
  })
})
