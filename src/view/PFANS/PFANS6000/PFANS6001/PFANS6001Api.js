import request from '../../../../utils/request'

export function getcooperinterview(data) {
  return request({
    url: 'cooperinterview/get',
    method: 'get',
    params: data
  })
}

export function getcooperinterviewApplyOne(data) {
  return request({
    url: 'cooperinterview/one',
    method: 'post',
    data: data
  })
}

export function updateinfor(data) {
  return request({
    url: 'expatriatesinfor/updateinfor',
    method: 'post',
    data: data
  })
}

export function createcooperinterviewApply(data) {
  return request({
    url: 'cooperinterview/create',
    method: 'post',
    data: data
  })
}

export function getSupplierNameList(data) {
  return request({
    url: 'cooperinterview/getSupplierNameList',
    method: 'POST',
    data: data
  })
}
