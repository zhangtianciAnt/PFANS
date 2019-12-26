import request from '../../../../utils/request'


export function get() {
  return request({
    url: 'petition/get',
    method: 'get'
  })
}
export function one(data) {
  return request({
    url: 'petition/one',
    method: 'post',
    data: data
  })
}
export function update(data) {
  return request({
    url: 'petition/update',
    method: 'post',
    data: data
  })
}

