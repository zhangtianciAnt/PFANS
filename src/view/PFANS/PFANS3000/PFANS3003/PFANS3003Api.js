import request from '../../../../utils/request'

export function getBusinessCard() {
  return request({
    url: 'businesscard/get',
    method: 'get'
  })
}

export function getBusinessCardOne(data) {
  return request({
    url: 'businesscard/one',
    method: 'post',
    data: data
  })
}

export function updateBusinessCard(data) {
  return request({
    url: 'businesscard/update',
    method: 'post',
    data: data
  })
}

export function createBusinessCard(data) {
  return request({
    url: 'businesscard/create',
    method: 'post',
    data: data
  })
}






