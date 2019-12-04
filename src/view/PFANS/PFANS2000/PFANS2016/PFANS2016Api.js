import request from "../../../../utils/request"

export function createPfans2016(data) {
  return request({
    url: 'abNormal/insertInfo',
    method: 'post',
    data: data
  })
}

export function getOvertimelist(data) {
  return request({
    url: 'overtime/getOvertimelist',
    method: 'post',
    data: data
  })
}

export function updatePfans2016(data) {
  return request({
    url: 'abNormal/updateInfo',
    method: 'post',
    data: data
  })
}

export function getFpans2016List() {
  return request({
    url: 'abNormal/list',
    method: 'post'
  })
}

export function getPfans2016One(data) {
  return request({
    url: 'abNormal/oneInfo',
    method: 'post',
    data: data
  })
}
