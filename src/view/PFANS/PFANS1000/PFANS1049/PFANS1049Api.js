import request from "../../../../utils/request"
export function list() {
  return request({
    url: 'incomeexpenditure/list',
    method: 'get'
  })
}

export function selectlist(data) {
  return request({
    url: 'incomeexpenditure/selectlist',
    method: 'get',
    params: data,
  })
}
export function insert(data) {
  return request({
    url: 'incomeexpenditure/insert',
    method: 'post',
    data: data
  })
}

export function getradio(data) {
  return request({
    url: 'incomeexpenditure/getradio',
    method: 'get',
    params: data,
  })
}
