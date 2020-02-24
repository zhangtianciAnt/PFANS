import request from '../../../../utils/request'

export function get(data) {
  return request({
    url: 'napalm/get',
    method: 'get',
    params: data
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

