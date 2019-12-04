import request from '../../../../utils/request'

export function getCasgiftApply() {
  return request({
    url: 'casgiftapply/get',
    method: 'get'
  })
}
export function getCasgiftApplyOne(data) {
  return request({
    url: 'casgiftapply/one',
    method: 'post',
    data: data
  })
}
export function updateCasgiftApply(data) {
  return request({
    url: 'casgiftapply/update',
    method: 'post',
    data: data
  })
}
export function createCasgiftApply(data) {
  return request({
    url: 'casgiftapply/create',
    method: 'post',
    data: data
  })
}
export function getCasgiftApplyList(data) {
  return request({
    url: 'casgiftapply/getCasgiftApplyList',
    method: 'post',
    data: data
  })
}
