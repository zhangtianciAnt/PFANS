import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'contracttheme/get',
    method: 'get'
  })
}

export function One(data) {
  return request({
    url: 'contracttheme/one',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'contracttheme/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'contracttheme/create',
    method: 'post',
    data: data
  })
}






