import request from '../../../../utils/request'


export function get() {
  return request({
    url: 'petition/get',
    method: 'get'
  })
}
export function selectById(data) {
  return request({
    url: 'petition/selectById',
    method: 'post',
    params: data
  })
}
export function update(data) {
  return request({
    url: 'petition/update',
    method: 'post',
    data: data
  })
}

