import request from '../../../../utils/request'

export function getFixedassets() {
  return request({
    url: 'fixedassets/get',
    method: 'get'
  })
}

export function getFixedassetsOne(data) {
  return request({
    url: 'fixedassets/one',
    method: 'post',
    data: data
  })
}

export function updateFixedassets(data) {
  return request({
    url: 'fixedassets/update',
    method: 'post',
    data: data
  })
}

export function createFixedassets(data) {
  return request({
    url: 'fixedassets/create',
    method: 'post',
    data: data
  })
}

export function getAssetsnameList(data) {
  return request({
    url: 'fixedassets/getAssetsnameList',
    method: 'POST',
    data: data
  })
}
