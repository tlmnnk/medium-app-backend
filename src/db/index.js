const mongoose = require('mongoose')
const { MONGO_CONNECTION_STRING } = require('../common/config')

const connectToDB = (cb) => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })

  const db = mongoose.connection

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
