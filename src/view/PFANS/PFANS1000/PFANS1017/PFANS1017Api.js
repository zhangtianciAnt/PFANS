import request from '../../../../utils/request'

export function getPsdcd() {
  return request({
    url: 'psdcd/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'psdcd/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'psdcd/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'psdcd/insert',
    method: 'post',
    data: data
  })
}
