'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  //正式环境
  // BASE_API: '"http://10.194.144.208:5556/"',
  // WS_API: '"ws://10.194.144.208:5556/"',
  // UPLOAD_URL:'"http://10.194.144.208:8002/?explorer/fileUpload&accessToken={1}&upload_to=E:/Kodkit/root/data/User/admin/home/PFANS/"',
  // DOWN_URL:'"http://10.194.144.208:8002/?explorer/fileDownload&accessToken={1}"'

  // 预生成环境
  BASE_API:'"http://59.80.34.104:5556/"',
  WS_API:'"ws://59.80.34.104:5556/"',
  UPLOAD_URL:'"http://39.108.133.62:8002/kodexplorer/?explorer/fileUpload&accessToken={1}&upload_to=/opt/lampp/htdocs/kodexplorer/data/User/admin/home/document/"',
  DOWN_URL:'"http://39.108.133.62:8002/kodexplorer/?explorer/fileDownload&accessToken={1}"'
})
