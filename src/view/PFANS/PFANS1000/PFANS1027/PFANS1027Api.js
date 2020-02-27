import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'quotation/get',
    method: 'get'
  })
}
export function selectById(data) {
  return request({
    url: 'quotation/selectById',
    method: 'get',
    params: data
  })
}
export function update(data) {
  return request({
    url: 'quotation/update',
    method: 'post',
    data: data
  })
}
export function insert(data) {
  return request({
    url: 'quotation/insert',
    method: 'post',
    data: data
  })
}
