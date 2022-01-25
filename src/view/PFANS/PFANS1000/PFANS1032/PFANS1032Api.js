import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload'

// 添加筛选条件 ztc fr
export function get(data) {
  return request({
    url: 'petition/get',
    method: 'post',
    data: data
    // 添加筛选条件 ztc to
  })
}
export function one(data) {
  return request({
    url: 'petition/one',
    method: 'post',
    data: data
  })
}
export function update(data) {
  return request({
    url: 'petition/update',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestDownload({
    url: 'petition/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

export function getPetSearch(data) {
  return request({
    url: 'petition/getPetSearch',
    method: 'post',
    data: data
  })
}
