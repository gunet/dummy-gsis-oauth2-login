require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
// eslint-disable-next-line import/no-dynamic-require
const config = require('./config.' + env)
module.exports = config