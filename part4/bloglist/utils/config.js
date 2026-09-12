require('dotenv').config()

const PORT = process.env.PORT || 3003

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI

const SECRET = process.env.SECRET || 'development-secret-change-this'

module.exports = { MONGODB_URI, PORT, SECRET }
