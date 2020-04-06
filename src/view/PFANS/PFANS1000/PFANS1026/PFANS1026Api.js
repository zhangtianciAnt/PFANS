import request from '../../../../utils/request'

export function get(data) {
  return request({
    url: 'contractapplication/get',
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

export function insertBook(data) {
  return request({
    url: 'contractapplication/insertBook',
    method: 'post',
    data: data
  })
}

export function existCheck(data) {
  return request({
    url: 'contractapplication/existCheck',
    method: 'get',
    params: data
  })
}

export function getSupplier(data) {
  return request({
    url: 'contractapplication/getSupplier',
    method: 'get',
    params: data
  })
}
