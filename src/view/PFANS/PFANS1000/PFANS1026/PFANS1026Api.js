import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'contractapplication/get',
    method: 'get',
  })
}

export function selectById(data) {
  return request({
    url: 'contractapplication/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'contractapplication/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'contractapplication/insert',
    method: 'post',
    data: data
  })
}
