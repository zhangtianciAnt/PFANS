import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'napalm/get',
    method: 'get'
  })
}

export function one(data) {
  return request({
    url: 'napalm/one',
    method: 'post',
    data: datae
  })
}

export function update(data) {
  return request({
    url: 'napalm/update',
    method: 'post',
    data: data
  })
}

