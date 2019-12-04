import request from '../../../../utils/request'

export function getPurchase() {
  return request({
    url: 'purchase/get',
    method: 'get'
  })
}

export function getPurchaseOne(data) {
  return request({
    url: 'purchase/one',
    method: 'post',
    data: data
  })
}

export function updatePurchase(data) {
  return request({
    url: 'purchase/update',
    method: 'post',
    data: data
  })
}

export function createPurchase(data) {
  return request({
    url: 'purchase/create',
    method: 'post',
    data: data
  })
}
