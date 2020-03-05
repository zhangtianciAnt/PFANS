import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';

export function get(data) {
  return request({
    url: 'contract/get',
    method: 'get',
    params: data
  })
}

export function one(data) {
  return request({
    url: 'contract/one',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'contract/update',
    method: 'post',
    data: data
  })
}

export function generateJxls(data) {
  return requestDownload({
    url: 'contract/generateJxls',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

