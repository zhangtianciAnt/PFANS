'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  //本地
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:5556/"',
  WS_API: '"ws://127.0.0.1:5556/"',
  UPLOAD_URL: '"http://192.168.0.137:5558?explorer/fileUpload&accessToken={1}&upload_to=C:/Kodkit/root/data/User/admin/home/"',
  DOWN_URL: '"http://192.168.0.137:5558?explorer/fileDownload&accessToken={1}"',

  //20环境
  // NODE_ENV: '"development"',
  // BASE_API: '"http://127.0.0.1:5559/"',
  // WS_API: '"ws://127.0.0.1:5559/"',
  // UPLOAD_URL:'"http://172.16.2.123:5558?explorer/fileUpload&accessToken={1}&upload_to=C:/Kodkit/root/data/User/admin/home/"',
  // DOWN_URL:'"http://172.16.2.123:5558?explorer/fileDownload&accessToken={1}"'
});
