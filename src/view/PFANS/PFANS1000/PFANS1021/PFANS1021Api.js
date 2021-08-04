import request from '../../../../utils/request'

export function getSecurity() {
  return request({
    url: 'security/get',
    method: 'get',
  })
}

export function selectById(data) {
  return request({
    url: 'security/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'security/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'security/insert',
    method: 'post',
    data: data
  })
}
