import request from '../../../../utils/request'

export function get() {
  return request({
    url: 'businessplan/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'businessplan/selectById',
    method: 'get',
    params: data
  })
}
export function getPersonPlan(data) {
  return request({
    url: 'businessplan/getpersonplan',
    method: 'get',
    params: data
  })
}

export function updateBusinessplan(data) {
  return request({
    url: 'businessplan/update',
    method: 'post',
    data: data
  })
}

export function createBusinessplan(data) {
  return request({
    url: 'businessplan/create',
    method: 'post',
    data: data
  })
}
export function getPlan(data) {
  return request({
    url: 'personnelplan/get',
    method: 'post',
    data: data
  })
}

export function getgroupA1(data) {
  return request({
    url: 'businessplan/getgroupA1',
    method: 'get',
    params: data,
  })
}

export function getgroup(data) {
  return request({
    url: 'businessplan/getgroup',
    method: 'get',
    params: data,
  })
}


