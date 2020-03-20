import request from '../../../../utils/request'

export function getpriceset(data) {
  return request({
    url: 'priceset/list',
    method: 'get',
    data: data
  })
}
export function updatepriceset(data) {
  return request({
    url: 'priceset/update',
    method: 'post',
    data: data
  })
}
