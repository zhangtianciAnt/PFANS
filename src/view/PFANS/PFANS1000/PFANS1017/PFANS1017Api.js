import request from '../../../../utils/request'

export function getPsdcd() {
  return request({
    url: 'Psdcd/get',
    method: 'get'
  })
}

export function getPsdcdOne(data) {
  return request({
    url: 'Psdcd/one',
    method: 'post',
    data: data
  })
}

export function updatePsdcd(data) {
  return request({
    url: 'Psdcd/update',
    method: 'post',
    data: data
  })
}

export function createPsdcd(data) {
  return request({
    url: 'Psdcd/create',
    method: 'post',
    data: data
  })
}
