import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'award/get',
    method: 'get',
  })
}
export function update() {
  return request({
    url: 'award/update',
    method: 'post',
  })
}
export function selectById() {
  return request({
    url: 'award/selectById',
    method: 'get',
  })
}
