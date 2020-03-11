import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'evection/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'evection/selectById',
    method: 'get',
    params: data
  })
}

export function update(data) {
  return request({
    url: 'evection/update',
    method: 'post',
    data: data
  })
}

export function create(data) {
  return request({
    url: 'evection/create',
    method: 'post',
    data: data
  })
}
export function getdate() {
  return request({
    url: 'evection/getBusiness',
    method: 'get',
  })
}
export function getLoanApplication() {
  return request({
    url: 'evection/getLoanApplication',
    method: 'get',
  })
}





