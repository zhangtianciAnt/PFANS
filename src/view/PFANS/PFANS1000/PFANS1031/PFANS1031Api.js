import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';

export function get(data) {
  return request({
    url: 'napalm/get',
    // 添加筛选条件 ztc fr
    method: 'post',
    data: data
    // 添加筛选条件 ztc to
  })
}

export function one(data) {
  return request({
    url: 'napalm/one',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'napalm/update',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestDownload({
    url: 'napalm/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

export function getNapSearch(data) {
  return request({
    url: 'napalm/getNapSearch',
    method: 'post',
    data: data
  })
}

