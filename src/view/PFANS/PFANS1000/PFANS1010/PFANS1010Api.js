import request from '../../../../utils/request'

//获取流程列表
export function getCommunication() {
  return request({
    url: 'communication/get',
    method: 'get'
  })
}

//获取详细
export function getCommunicationOne(data) {
  return request({
    url: 'communication/one',
    method: 'post',
    data: data
  })
}

//更新流程
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
