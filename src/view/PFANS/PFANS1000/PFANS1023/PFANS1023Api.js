import request from '../../../../utils/request'

export function getConfidential() {
  return request({
    url: 'confidential/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'confidential/selectById',
    method: 'post',
    data: data
  })
}

export function updateConfidential(data) {
  return request({
    url: 'confidential/update',
    method: 'post',
    data: data
  })
}

export function createConfidential(data) {
  return request({
    url: 'confidential/create',
    method: 'post',
    data: data
  })
}

export function getForSelect (data) {
  return request({
    url: 'dictionary/getForSelect',
    method: 'get',
    params: data
  })
}
