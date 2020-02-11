import request from '../../../../utils/request'


export function get() {
  return request({
    url: 'closeapplicat/get',
    method: 'get'
  })
}
export function selectById(data) {
  return request({
    url: 'closeapplicat/selectById',
    method: 'post',
    data: data
  })
}
export function update(data) {
  return request({
    url: 'closeapplicat/update',
    method: 'post',
    data: data
  })
}
export function insert(data) {
  return request({
    url: 'closeapplicat/insert',
    method: 'post',
    data: data
  })
}
