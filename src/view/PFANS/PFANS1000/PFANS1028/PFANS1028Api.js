import request from '../../../../utils/request'


export function get() {
  return request({
    url: 'nonjudgment/get',
    method: 'get'
  })
}
//   add  ml  211130  分页  from
export function getPage() {
  return request({
    url: 'nonjudgment/getPage',
    method: 'get'
  })
}
//   add  ml  211130  分页  to
export function one(data) {
  return request({
    url: 'nonjudgment/one',
    method: 'post',
    data: data
  })
}
export function update(data) {
  return request({
    url: 'nonjudgment/update',
    method: 'post',
    data: data
  })
}
