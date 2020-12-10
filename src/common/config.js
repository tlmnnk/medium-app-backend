const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.join(__dirname, '../../.env'),
})

module.exports = {
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
}
