import request from '../../../../utils/request'

export function selectById() {
  return request({
    url: 'recruit/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'recruit/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'recruit/insert',
    method: 'post',
    data: data
  })
}

