const { connectToDB } = require('./db')
const app = require('./app')

connectToDB(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
})
