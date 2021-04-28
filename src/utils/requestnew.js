import axios from 'axios'
import router from '../router'
import {
  getToken,
  removeToken
} from './auth'
import  {Decrypt} from './customize'
import i18n from '../assets/js/i18n'
let Base64 = require('js-base64').Base64

// axios.defaults.timeout =  6000;

const service = axios.create({
  baseURL: "http://10.194.144.208:5557/",
});

service.interceptors.request.use(config => {

  if (getToken()) {
    config.headers['x-auth-token'] = getToken()
  }
  config.headers['locale'] = i18n.locale;
    config.headers['datatype'] = sessionStorage.getItem("datatype");
  // if (store.getters.currentUrl) {
  let url = router.currentRoute.fullPath;
  console.log(router.currentRoute)
  if ("PFANS1001FormView" == router.currentRoute.name) {
    if (router.currentRoute.params.title === 1) {
      url = "/PFANS1002FormView";
    } else if (router.currentRoute.params.title === 2) {
      url = "/PFANS1035FormView";
    } else if (router.currentRoute.params.title === 3) {
      url = "/PFANS1003FormView";
    } else if (router.currentRoute.params.title === 4) {
      url = "/PFANS1004FormView";
    } else if (router.currentRoute.params.title === 5) {
      url = "/PFANS1005FormView";
    } else if (router.currentRoute.params.title === 6) {
      url = "/PFANS1006FormView";
    } else if (router.currentRoute.params.title === 10) {
      url = "/PFANS1010FormView";
    } else if (router.currentRoute.params.title === 11) {
      url = "/PFANS1011FormView";
    }
  }

  if ("PFANS1037FormView" == router.currentRoute.name) {
    if (router.currentRoute.params.title === 7) {
      url = "/PFANS1007FormView";
    } else if (router.currentRoute.params.title === 8) {
      url = "/PFANS1008FormView";
    } else if (router.currentRoute.params.title === 9) {
      url = "/PFANS1009FormView";
    }
  }

  config.headers['currentUrl'] = url;
  // }
  return config
}, error => {
  console.log(error); // for debug
  Promise.reject(error)
});

// respone interceptor
service.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      if (response.data.code === 20101) {
        removeToken();
        // if (router.currentRoute.path !== '/') {
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
          })

          // return Promise.reject(i18n.t('normal.error_05'))
        // }else {
          return false;
        // }

      } else if (response.data.code === 20102) {
        router.push({
          name: 'error403'
        })
      }else {
        if(response.data.code === 0){
          if(response.config.url.indexOf('file/getToken') == -1){
            response.data.data = JSON.parse(Decrypt(response.data.data));
          }
        }
        return response.data;
      }
    } else {
      return Promise.reject(i18n.t('normal.error_06') + response.status)
    }
  },
  error => {
    console.log('err' + error); // for debug
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1){
      return Promise.reject(i18n.t('normal.error_25'))
    }
    return Promise.reject(i18n.t('normal.error_07'))
  });

export default service