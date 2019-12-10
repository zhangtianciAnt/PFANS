import request from '../../../../utils/request'

export function getRouting() {
  return request({
    url: 'routing/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'routing/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'routing/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'routing/insert',
    method: 'post',
    data: data
  })
}
