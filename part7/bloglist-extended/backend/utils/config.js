require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let TEST_MODE = ''

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
  TEST_MODE = 'test'
}

module.exports = {
  MONGODB_URI,
  PORT,
  TEST_MODE
}