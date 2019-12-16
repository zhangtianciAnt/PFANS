import request from '../../../../utils/request'

export function getCommunication() {
  return request({
    url: 'communication/get',
    method: 'get'
  })
}

export function getCommunicationOne(data) {
  return request({
    url: 'communication/one',
    method: 'post',
    data: data
  })
}

export function updateCommunication(data) {
  return request({
    url: 'communication/update',
    method: 'post',
    data: data
  })
}

export function createCommunication(data) {
  return request({
    url: 'communication/create',
    method: 'post',
    data: data
  })
}
