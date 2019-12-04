import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from '../router'
import { getToken, removeToken } from './auth'
import i18n from '../assets/js/i18n'

const service = axios.create({
  baseURL: process.env.BASE_API,
})

service.interceptors.request.use(config => {

  if (getToken()) {
    config.headers['x-auth-token'] = getToken()
  }
  config.headers['locale'] = i18n.locale

  if (store.getters.currentUrl) {
    config.headers['currentUrl'] = store.getters.currentUrl;
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      if (response.data.code === 20101) {
        removeToken();
        router.replace({
          path: '/',
          query: { redirect: router.currentRoute.fullPath }
        })
        return Promise.reject(i18n.t('normal.error_05'))
      } else {
        return response.data;
      }
    } else {
      return Promise.reject(i18n.t('normal.error_06') + response.status)
    }
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(i18n.t('normal.error_07'))
  })

export default service
