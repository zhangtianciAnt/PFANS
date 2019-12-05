import request from '../../../../utils/request'

export function getRouting() {
  return request({
    url: 'Routing/get',
    method: 'get'
  })
}

export function getRoutingOne(data) {
  return request({
    url: 'Routing/one',
    method: 'post',
    data: data
  })
}

export function updateRouting(data) {
  return request({
    url: 'Routing/update',
    method: 'post',
    data: data
  })
}

export function createRouting(data) {
  return request({
    url: 'Routing/create',
    method: 'post',
    data: data
  })
}
