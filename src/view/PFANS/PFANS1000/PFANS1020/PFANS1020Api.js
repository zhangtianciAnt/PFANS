import request from '../../../../utils/request'

export function getOutside() {
  return request({
    url: 'outside/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'outside/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'outside/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'outside/insert',
    method: 'post',
    data: data
  })
}
