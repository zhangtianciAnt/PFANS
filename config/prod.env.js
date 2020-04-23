'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  //正式环境
  BASE_API: '"http://10.194.144.208:5556/"',
  WS_API: '"ws://10.194.144.208:5556/"',
  UPLOAD_URL:'"http://10.194.144.208:8002/?explorer/fileUpload&accessToken={1}&upload_to=E:/Kodkit/root/data/User/admin/home/PFANS/"',
  DOWN_URL:'"http://10.194.144.208:8002/?explorer/fileDownload&accessToken={1}"'
})
