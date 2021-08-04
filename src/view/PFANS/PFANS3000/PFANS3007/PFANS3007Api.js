import request from '../../../../utils/request'
export function getJapanCondominium() {
  return request({
    url: 'japancondominium/get',
    method: 'get'
  })
}
export function selectById(data) {
  return request({
    url: 'japancondominium/selectById',
    method: 'get',
    params: data
  })
}
export function updateJapanCondominium(data) {
  return request({
    url: 'japancondominium/update',
    method: 'post',
    data: data
  })
}
export function createJapanCondominium(data) {
  return request({
    url: 'japancondominium/create',
    method: 'post',
    data: data
  })
}






