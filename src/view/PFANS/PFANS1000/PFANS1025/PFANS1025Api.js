import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'award/get',
    method: 'get',
  })
}
export function update(data) {
  return request({
    url: 'award/update',
    method: 'post',
    data: data
  })
}
export function selectById(data) {
  return request({
    url: 'award/selectById',
    method: 'get',
    params: data
  })
}
