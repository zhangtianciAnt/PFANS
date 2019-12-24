import request from '../../../../utils/request'

export function getOffshore() {
  return request({
    url: 'offshore/get',
    method: 'get'
  })
}

export function getOffshoreOne(data) {
  return request({
    url: 'offshore/one',
    method: 'post',
    data: data
  })
}

export function updateOffshore(data) {
  return request({
    url: 'offshore/update',
    method: 'post',
    data: data
  })
}

export function createOffshore(data) {
  return request({
    url: 'offshore/create',
    method: 'post',
    data: data
  })
}
