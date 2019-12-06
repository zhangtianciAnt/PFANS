import request from '../../../../utils/request'

export function getglobal(data) {
  return request({
    // 主键
    url: 'global/get',
    method: 'get',
    params: data
  })
}
export function getglobalApplyOne(data) {
  return request({
    url: 'global/one',
    method: 'post',
    data: data
  })
}
export function updateglobalApply(data) {
  return request({
    url: 'global/update',
    method: 'post',
    data: data
  })
}
export function createglobalApply(data) {
  return request({
    url: 'global/create',
    method: 'post',
    data: data
  })
}
