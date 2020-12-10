const mongoose = require('mongoose')
const { MONGO_CONNECTION_STRING } = require('../env')

const connectToDB = (cb) => {
  const db = mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })

  db.on('error', () => {
    console.log('DB error...')
  })

  db.once('open', () => {
    console.log('Successfully connected to DB')
  })

  cb()
}

module.exports = {
  connectToDB,
}
