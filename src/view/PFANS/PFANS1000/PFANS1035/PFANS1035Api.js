import request from '../../../../utils/request'

export function getBusiness(data) {
  return request({
    url: 'business/get',
    method: 'get',
    data: data
  })
}

export function selectById(data) {
  return request({
    url: 'business/selectById',
    method: 'get',
    params: data
  })
}

export function updateBusiness(data) {
  return request({
    url: 'business/update',
    method: 'post',
    data: data
  })
}

export function createBusiness(data) {
  return request({
    url: 'business/create',
    method: 'post',
    data: data
  })
}






