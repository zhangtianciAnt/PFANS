import request from "../../../../utils/request"

export function createPfans2018(data) {
  return request({
    url: 'attendancesetting/insertInfo',
    method: 'post',
    data: data
  })
}

export function updatePfans2018(data) {
  return request({
    url: 'attendancesetting/updateInfo',
    method: 'post',
    data: data
  })
}

export function getFpans2018List() {
  return request({
    url: 'attendancesetting/list',
    method: 'post'
  })
}

export function getPfans2018One(data) {
  return request({
    url: 'attendancesetting/oneInfo',
    method: 'post',
    data: data
  })
}
