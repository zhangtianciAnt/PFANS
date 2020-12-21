import request from "../../../../utils/request"


export function getprojects(data) {
  return request({
    url: 'projectincome/getprojects',
    method: 'get',
    params: data,
  })
}

export function insert(data) {
  return request({
    url: 'projectincome/insert',
    method: 'post',
    data: data
  })
}

export function get(data) {
  return request({
    url: 'projectincome/get',
    method: 'get',
    params: data
  })
}

export function selectById(data) {
  return request({
    url: 'projectincome/selectById',
    method: 'get',
    params: data
  })
}
