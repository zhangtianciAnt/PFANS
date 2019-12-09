import request from '../../../../utils/request'

export function getConfidential(data) {
  return request({
    url: 'confidential/get',
    method: 'get',
    params: data
  })
}

export function getConfidentialOne(data) {
  return request({
    url: 'confidential/one',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'confidential/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'confidential/insert',
    method: 'post',
    data: data
  })
}
