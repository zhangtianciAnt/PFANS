import request from "../../../../utils/request"

export function getInfo(data) {
  return request({
    url: 'expenditureForecast/getInfo',
    method: 'post',
    data: data
  })
}
export function getThemeOutDepth(data) {
  return request({
    url: 'expenditureForecast/getThemeOutDepth',
    method: 'post',
    data: data
  })
}
export function saveInfo(data) {
  return request({
    url: 'expenditureForecast/saveInfo',
    method: 'post',
    data: data
  })
}
export function getPoortDepth(data) {
  return request({
    url: 'expenditureForecast/getPoortDepth',
    method: 'post',
    data: data
  })
}
