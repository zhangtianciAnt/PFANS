import request from '../../../../utils/request'

export function getOvertime() {
  return request({
    url: 'overtime/get',
    method: 'get'
  })
}
export function getOvertimeOne(data) {
  return request({
    url: 'overtime/one',
    method: 'post',
    data: data
  })
}
export function updateOvertime(data) {
  return request({
    url: 'overtime/update',
    method: 'post',
    data: data
  })
}
export function createOvertime(data) {
  return request({
    url: 'overtime/create',
    method:'post',
    data: data
  })
}






