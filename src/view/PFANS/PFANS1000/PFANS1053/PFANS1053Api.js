import request from "../../../../utils/request"

export function saveInfo(data) {
  return request({
    url: 'revenueForecast/saveInfo',
    method: 'post',
    data: data
  })
}

export function getInfo(data) {
  return request({
    url: 'revenueForecast/getInfo',
    method: 'post',
    data: data
  })
}

export function getThemeOutDepth(data) {
  return request({
    url: 'revenueForecast/getThemeOutDepth',
    method: 'post',
    data: data
  })
}


