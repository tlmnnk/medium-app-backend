const mongoose = require('mongoose')
const { MONGO_CONNECTION_STRING } = require('../common/config')
const { Profile } = require('../resources/profiles/profiles.model')

const profiles = [
  new Profile({
    username: 'User1',
    email: 'abc@abc.com',
    password: '23232323',
  }),
  new Profile({
    username: 'User1',
    email: 'ab111c@abc.com',
    password: 'asfd23f2',
  }),
]

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
    profiles.forEach((item) => {
      item.save()
    })
  })

  cb()
}

module.exports = {
  connectToDB,
}
