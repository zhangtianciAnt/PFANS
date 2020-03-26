import request from '../../../../utils/request'

export function getUnusedevice(data) {
  return request({
    url: 'unusedevice/get',
    method: 'get',
    data: data
  })
}

export function getUnusedeviceOne(data) {
  return request({
    url: 'unusedevice/one',
    method: 'post',
    data: data
  })
}

export function updateUnusedevice(data) {
  return request({
    url: 'unusedevice/update',
    method: 'post',
    data: data
  })
}

export function createUnusedevice(data) {
  return request({
    url: 'unusedevice/create',
    method: 'post',
    data: data
  })
}
