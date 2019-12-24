import request from '../../../../utils/request'

export function getexpatriatesinfor(data) {
  return request({
    url: 'expatriatesinfor/get',
    method: 'get',
    params: data
  })
}

export function getexpatriatesinforApplyOne(data) {
  return request({
    url: 'expatriatesinfor/one',
    method: 'post',
    data: data
  })
}

export function updateexpatriatesinforApply(data) {
  return request({
    url: 'expatriatesinfor/update',
    method: 'post',
    data: data
  })
}

export function createexpatriatesinforApply(data) {
  return request({
    url: 'expatriatesinfor/create',
    method: 'post',
    data: data
  })
}
