'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
//172.16.2.123  测试（内）
//59.46.185.130  测试
//10.194.144.208  正式
  NODE_ENV: '"production"',


  //正式环境
  // BASE_API: '"http://10.194.144.208:5556/"',
  // WS_API: '"ws://10.194.144.208:5556/"',
  // UPLOAD_URL:'"http://10.194.144.212:80/kodexplorer/?explorer/fileUpload&accessToken={1}&upload_to=/opt/lampp/htdocs/kodexplorer/data/User/admin/home/document/"',
  // DOWN_URL:'"http://10.194.144.212:80/kodexplorer/?explorer/fileDownload&accessToken={1}"'


  //2020端口测试环境
  BASE_API: '"http://59.46.185.130:5559/"',
  WS_API: '"ws://59.46.185.130:5559/"',
  UPLOAD_URL:'"http://59.46.185.130:5558?explorer/fileUpload&accessToken={1}&upload_to=C:/Kodkit/root/data/User/admin/home/"',
  DOWN_URL:'"http://59.46.185.130:5558?explorer/fileDownload&accessToken={1}"'
})
