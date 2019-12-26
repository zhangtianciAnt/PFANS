import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '../router'
import { getToken, removeToken } from './auth'
import i18n from '../assets/js/i18n'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API,
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // 真实环境自动获取token
  if (getToken()) {
    config.headers['x-auth-token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  config.headers['locale'] = i18n.locale // 增加画面语言
  // 本地测试时，用固定token
  // config.headers['x-auth-token'] = '4bfbd385e526d087f6def97713656d72';

  if (store.getters.currentUrl) {
    config.headers['currentUrl'] = store.getters.currentUrl;
  }
  return config
}, error => {

  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    debugger
    if (response.status >= 200 && response.status < 300) {
        var blob = new Blob([response.data], { type: response.data.type + ';charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        var downloadElement = document.createElement('a');
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = decodeURI(response.data.type) + '.xls'; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
        return response.data

    } else {
      return Promise.reject(i18n.t('normal.error_06') + response.status)
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(i18n.t('normal.error_07'))
  })

export default service
