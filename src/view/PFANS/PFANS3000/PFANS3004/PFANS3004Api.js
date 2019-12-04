import request from '../../../../utils/request'

export function getStationery() {
  return request({
    url: 'stationery/get',
    method: 'get'
  })
}

export function getStationeryOne(data) {
  return request({
    url: 'stationery/one',
    method: 'post',
    data: data
  })
}

export function updateStationery(data) {
  return request({
    url: 'stationery/update',
    method: 'post',
    data: data
  })
}

export function createStationery(data) {
  return request({
    url: 'stationery/create',
    method: 'post',
    data: data
  })
}






