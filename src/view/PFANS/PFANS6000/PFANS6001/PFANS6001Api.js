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

export function updatecooperinterviewApply(data) {
  return request({
    url: 'cooperinterview/update',
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
