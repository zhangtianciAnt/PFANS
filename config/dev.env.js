'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:5556/"',
  WS_API: '"ws://127.0.0.1:5556/"',
  UPLOAD_URL:'"http://39.108.133.62:8002/kodexplorer/?explorer/fileUpload&accessToken={1}&upload_to=/opt/lampp/htdocs/kodexplorer/data/User/admin/home/document/"',
  DOWN_URL:'"http://39.108.133.62:8002/kodexplorer/?explorer/fileDownload&accessToken={1}"'
})
