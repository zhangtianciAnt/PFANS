import Cookies from 'js-cookie'
import { getValueByPath } from 'element-ui/src/utils/util'
// token
const TokenKey = 'x-auth-token'

const Usertype = 'usertype'

// 用户可见app
const applicationKey = 'user-application'

// 用户选择App
const selectedAppKey = 'selected-application'

// APP下的menu
const appMenu = 'app_menu'

// app下默认的menu
const defaultMenu = 'app_defalut_menu'

// 获取APP下的menu
export function getAppMenu () {
  return sessionStorage.getItem(appMenu)
}

// 设置APP下的menu
export function setAppMenu (appMenuData) {
  return sessionStorage.setItem(appMenu, appMenuData)
}

// 移除APP下的menu
export function removeAppMenu () {
  return sessionStorage.removeItem(appMenu)
}

// 获取APP下的默认menu
export function getDefaultMenu () {
  return sessionStorage.getItem(defaultMenu)
}

// 设置APP下的默认menu
export function setDefaultMenu (appMenuData) {
  return sessionStorage.setItem(defaultMenu, appMenuData)
}

// 移除APP下的默认menu
export function removeDefaultMenu () {
  return sessionStorage.removeItem(defaultMenu)
}

const file_token = 'csrftoken'

const file_session = 'sessionid'

export function getFileToken () {
  return Cookies.get(file_token)
}

export function setFileToken (token) {
  return Cookies.set(file_token, token)
}

export function removeFileToken () {
  return Cookies.remove(file_token)
}

export function getFileSession () {
  return Cookies.get(file_session)
}

export function setFileSession (token) {
  return Cookies.set(file_session, token)
}

export function removeFileSession () {
  return Cookies.remove(file_session)
}

export function orderBy (array, sortKey, reverse) {
  if (!sortKey) {
    return array
  }
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1
  }
  var getKey = function (value, index) {
    if (sortKey !== '$key') {
      if (isObject(value) && '$value' in value) value = value.$value
    }
    return [isObject(value) ? getValueByPath(value, sortKey) : value]
  }
  var compare = function compare (a, b) {
    for (var i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1
      }
      if (a.key[i] > b.key[i]) {
        return 1
      }
    }
    return 0
  }
  return array.map(function (value, index) {
    return {
      value: value,
      index: index,
      key: getKey ? getKey(value, index) : null
    }
  }).sort(function (a, b) {
    var order = compare(a, b)
    if (!order) {
      // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
      order = a.index - b.index
    }
    return order * reverse
  }).map(function (item) {
    return item.value
  })
};

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }

var isObject = function isObject (obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object'
}

// 获取token
export function getToken () {
  return sessionStorage.getItem(TokenKey)
}

// 设置token
export function setToken (token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function setUsertype (token) {
  return sessionStorage.setItem(Usertype, token)
}

export function getUsertype () {
  return sessionStorage.getItem(Usertype)
}

// 移除token
export function removeToken () {
  return sessionStorage.removeItem(TokenKey)
}

// 设置可见APP
export function setApplication (application) {
  return sessionStorage.setItem(applicationKey, application)
}

// 获取可见APP
export function getApplication () {
  return sessionStorage.getItem(applicationKey)
}

// 移除可见APP
export function removeApplication () {
  return sessionStorage.removeItem(applicationKey)
}

// 设置选择APP
export function setSelectedApp (selectedApp) {
  return sessionStorage.setItem(selectedAppKey, selectedApp)
}

// 获取选择APP
export function getSelectedApp () {
  return sessionStorage.getItem(selectedAppKey)
}

// 移除所选APP
export function removeSelectedApp () {
  return sessionStorage.removeItem(selectedAppKey)
}

// 移除所有sessionStore
export function removeAll () {
  return sessionStorage.clear()
}
