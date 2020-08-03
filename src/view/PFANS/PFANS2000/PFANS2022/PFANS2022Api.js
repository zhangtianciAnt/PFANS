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
export function insert(data) {
  return request({
    url: 'casgiftapply/insert',
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
//add gbb 祝礼金申请关联发放 start
export function updateCasgiftApplyList(data) {
  return request({
    url: 'casgiftapply/updateCasgiftApplyList',
    method: 'post',
    data: data
  })
}
//add gbb 祝礼金申请关联发放 end
