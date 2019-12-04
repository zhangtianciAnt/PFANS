'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  BASE_API:'"http://59.80.34.104:5556/"',
  WS_API:'"ws://59.80.34.104:5556/"',
})
