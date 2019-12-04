import request from '../../../../utils/request'

export function getFlexiblework() {
  return request({
    url: 'flexiblework/get',
    method: 'get'
  })
}

export function getFlexibleworkOne(data) {
  return request({
    url: 'flexiblework/one',
    method: 'post',
    data: data
  })
}

export function updateFlexiblework(data) {
  return request({
    url: 'flexiblework/update',
    method: 'post',
    data: data
  })
}

export function createFlexiblework(data) {
  return request({
    url: 'flexiblework/create',
    method: 'post',
    data: data
  })
}
