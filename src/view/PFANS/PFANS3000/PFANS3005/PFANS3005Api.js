import request from '../../../../utils/request'
import requestPdf from "../../../../utils/requestPdf";

export function downLoad(data) {
  return requestPdf({
    url: 'purchase/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
export function getPurchase() {
  return request({
    url: 'purchase/get',
    method: 'get'
  })
}

export function getPurchaseList() {
  return request({
    url: 'purchase/getlist',
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
